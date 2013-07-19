(function() {

    var genExprFromOldAndNewOccFactors = function(factors, newOccFactors, oldOccFactors) {
       var colors = [KhanUtil.BLUE, KhanUtil.GREEN, KhanUtil.PINK, KhanUtil.ORANGE];
       var args = [];
       var oldNumFactors = 1;
       var newNumFactors = 1;
       var iColor = 0;
       for (var iFactor = 0; iFactor < factors.length; iFactor++) {
          var factor = factors[iFactor];
          if ((oldOccFactors[iFactor] <= 0) && (newOccFactors[iFactor] <= 0)) {
             continue;
          }
          if (typeof factor === "number") {
             oldNumFactors *= Math.pow(factor, oldOccFactors[iFactor]);
             newNumFactors *= Math.pow(factor, newOccFactors[iFactor]);
             continue;
          }
          if (oldOccFactors[iFactor] === newOccFactors[iFactor]) {
              if (newOccFactors[iFactor] === 1) {
                 args.push(factor);
              } else {
                 args.push({op: "^", args: [factor, newOccFactors[iFactor]]});
              }
          } else {
              var newArg = factor;
              if (newOccFactors[iFactor] === 0) {
                 if (oldOccFactors[iFactor] > 1) {
                    newArg = {op: "^", args: [newArg, oldOccFactors[iFactor]]};
                 }
                 newArg = KhanUtil.exprSetStyle(newArg, {cancel: colors[iColor]});
                 iColor++;
              } else {
                 var power;
                 if (newOccFactors[iFactor] > 1) {
                     power = KhanUtil.exprSetStyle(newOccFactors[iFactor], {cancelExpr: oldOccFactors[iFactor]});
                 } else {
                     power = KhanUtil.exprSetStyle(oldOccFactors[iFactor], {cancel: colors[iColor]});
                     iColor++;
                 }
                 newArg = {op: "^", args: [newArg, power]};
              }
              args.push(newArg);
          }
       }
       if (newNumFactors !== 1) {
           args.unshift(newNumFactors);
       }
       var removedFactors = oldNumFactors / newNumFactors;
       if (removedFactors !== 1) {
           args.unshift(KhanUtil.exprSetStyle(removedFactors, {cancel: colors[iColor]}));
       }
       var expr;
       if (args.length === 0) {
          expr = 1;
       } else if (args.length === 1) {
          expr = args[0];
       } else {
          expr = {op: "*", args: args};
       }
       return expr;
    };

    var getFractionFromOccFactors = function(factors, newTermsOccFactors, oldTermsOccFactors) {
       var newArgs = [];
       for (var iArg = 0; iArg < 2; iArg++) {
          if (oldTermsOccFactors === undefined) {
              newArgs.push(KhanUtil.genExprFromExpFactors(factors, newTermsOccFactors[iArg]));
          } else {
              newArgs.push(genExprFromOldAndNewOccFactors(factors, newTermsOccFactors[iArg], oldTermsOccFactors[iArg]));
          }
       }
       if (KhanUtil.exprIdentical(newArgs[0], newArgs[1]) && (oldTermsOccFactors === undefined)) {
          return 1;
       }
       if (KhanUtil.exprIdentical(newArgs[1], 1)) {
          return newArgs[0];
       }
       return {op: "dfrac", args: newArgs};
    };

    var addInitialSteps = function(steps) {
        var aExpr = {op: "var", args: ["a"]};
        var exampleFactors = [3, 5, aExpr, {op: "var", args: ["b"]}, {op: "var", args: ["c"]}];
        var exampleOldOccs = [[1, 0, 2, 1, 0], [0, 1, 1, 0, 1]];
        var exampleNewOccs = [[1, 0, 1, 1, 0], [0, 1, 0, 0, 1]];
        var exampleExprInit = getFractionFromOccFactors(exampleFactors, exampleOldOccs);
        var exampleExprStep = getFractionFromOccFactors(exampleFactors, exampleNewOccs, exampleOldOccs);
        var exampleExprEnd = getFractionFromOccFactors(exampleFactors, exampleNewOccs);
        var exampleGroup = [KhanUtil.parse("#{\\dfrac{a^2}{a}} &= #{\\dfrac{#{a} \\cdot a}{#{a}}}", [KhanUtil.BLUE, KhanUtil.BLUE, {cancel: true}, {cancel: true}]),
                            KhanUtil.parse("&= #{\\dfrac{a}{1}}", [KhanUtil.BLUE]),
                            KhanUtil.parse("&= #{a}", [KhanUtil.BLUE])];
         steps.add("<p>כדי לפשט את סוג הביטוי הזה, אנו נצטרך לחפש כפולות אשר נמצאות גם במונה וגם במכנה.</p> עבור כל כפולה, אשר יש לה חזקה זהה גם במונה וגם במכנה, אנו יכולים להסיר אותה לגמרי. אם החזקה אינו שווה, אנו יכולים להסיר את הכפולה עם החזקה הקטנה, ולחסר את החזקה הקטנה מהגדולה.</p>");
        var subHints = ["<p>למה אנחנו יכולים לפשט כל ביטוי בדרך הזו? נסתכל בצורה מפורטת על השלבים של הפישוט עם הביטוי  <code>" + KhanUtil.format(exampleExprStep) + "</code> :</p><p><code>" + KhanUtil.format(exampleExprInit) + "</code> ניתן להיות כמות כ <code>" +
            KhanUtil.parseFormat("\\dfrac{3}{5} \\cdot #{\\dfrac{a^2}{a}} \\cdot b \\cdot \\dfrac{1}{c}", [KhanUtil.BLUE]) + "</code></p><p><code>" +
            KhanUtil.formatGroup(exampleGroup) + "</code></p><p> אז אנחנו מקבלים  <code>" +
            KhanUtil.parseFormat("\\dfrac{3}{5} \\cdot #{a} \\cdot b \\cdot \\dfrac{1}{c}", [KhanUtil.BLUE]) + "</code>, או <code>" +
            KhanUtil.parseFormat("\\dfrac{3ab}{5c}") + "</code>"];
        steps.add("<p>לדוגמא, אם היה לנו את ביטוי : <code>" + KhanUtil.format(exampleExprInit) + "</code>, אנו יכולים לראות את הכפולה <code>" + KhanUtil.format(aExpr) + "</code> , אשר היא נמצאת גם במונה וגם במכנה.</p><p>אנו יכולים לפשט את זה כך : <code>" + KhanUtil.format(exampleExprStep) + "</code> ולקבל : <code>" + KhanUtil.format(exampleExprEnd) + "</code> " + KhanUtil.getSubHints("factoring", "הראה הסבר", subHints) + "</p><p> האם את היכול להשתמש בטכניקה הנלמדה פה עבור התרגיל ?</p>");
    };

    var factorNumeratorDenominator = function(expr, options, steps) {
        var newArgs = [];
        var wasSimplified = false;
        for (var iArg = 0; iArg < 2; iArg++) {
            var subSteps = new KhanUtil.StepsProblem([0], expr.args[iArg], "simplify by factoring");
            var newArg = KhanUtil.simplify(expr.args[iArg], options, subSteps); // Récupérer les indices

            var termName;
            if (iArg === 0) {
                termName = "מונה";
            } else {
                termName = "מכנה";
            }
            if (KhanUtil.stepIsUsed(subSteps)) {
                if (!wasSimplified) {
                    steps.add("<p>" + KhanUtil.exprToCode(expr) + "</p>");
                }
                steps.add("<p>אנו יכולים לראות שה" + termName + " יכול להיות מפוצל לכפולות אפילו יותר  : " + KhanUtil.exprToCode(expr.args[iArg]) + "<p>");
                steps.add(subSteps);
                steps.add("<p>אז ה" + termName + " הופך ל : " + KhanUtil.exprToCode(newArg) + "</p>");
                wasSimplified = true;
            }
            newArgs.push(newArg);
        }
        var newExpr = {op: expr.op, args: newArgs};
        if (wasSimplified) {
            steps.add("<p> אנו מקבלים את הביטוי החדש  :</p><p>" + KhanUtil.exprToCode(newExpr));
        }
        return newExpr;
    };
    var solveSimplifyingExpressionsExercise = function(expr) {
        var steps = new KhanUtil.StepsProblem([], expr, "נפשט על ידי מציאת הכפולות");
        addInitialSteps(steps);
        var subSteps = new KhanUtil.StepsProblem([], expr, "נמצא את הכפולות של המונה והמכנה");
        var options = KhanUtil.simplifyOptions.factor;
        var newExpr = factorNumeratorDenominator(expr, options, subSteps);
        if (KhanUtil.stepIsUsed(subSteps)) {
            steps.add("השלב הראשון הוא למצוא את הכפולות של המונה והמכנה אם קיימות : " +
               KhanUtil.getSubHints("factoring-num-denom", "הראה הסבר", [KhanUtil.genOneHint(subSteps)]) + "</p>" +
               "<p>אנו מצאנו את : " + KhanUtil.exprToCode(newExpr) + "</p>");
        }
        var factors = [];
        var argsOccFactors = [[], []];
        for (var iArg = 0; iArg < 2; iArg++) {
            KhanUtil.findExprFactorsExps(newExpr.args[iArg], options, factors, argsOccFactors[iArg], 1);
        }
        for (var iArg = 0; iArg < 2; iArg++) {
            KhanUtil.fillMissingOccFactors(factors, argsOccFactors[iArg]);
        }
        var newOccFactors = [[], []];
        for (var iFactor = 0; iFactor < factors.length; iFactor++) {
           var newOcc = argsOccFactors[0][iFactor] - argsOccFactors[1][iFactor];
           newOccFactors[0][iFactor] = 0;
           newOccFactors[1][iFactor] = 0;
           if (newOcc > 0) {
              newOccFactors[0][iFactor] = newOcc;
           } else {
              newOccFactors[1][iFactor] = -newOcc;
           }
        }
        var solExpr = getFractionFromOccFactors(factors, newOccFactors);
        var choices = [];
        for (var iFactor = 0; iFactor < factors.length; iFactor++) {
           var sideMax = 0;
           if (argsOccFactors[0][iFactor] < argsOccFactors[0][iFactor]) {
              sideMax = 1;
           }
           if (newOccFactors[sideMax][iFactor] > 0) {
               newOccFactors[sideMax][iFactor]--;
               choices.push(KhanUtil.exprClone(getFractionFromOccFactors(factors, newOccFactors)));
               newOccFactors[sideMax][iFactor]++;
           }
           newOccFactors[1 - sideMax][iFactor]++;
           choices.push(KhanUtil.exprClone(getFractionFromOccFactors(factors, newOccFactors)));
           newOccFactors[1 - sideMax][iFactor]--;
        }

        var hintExpr = getFractionFromOccFactors(factors, newOccFactors, argsOccFactors);
        if (KhanUtil.exprIdentical(newExpr, solExpr)) {
            steps.add("<p class='final_answer'>אין כפולות שאפשר לפשט איתם את ביטוי זה, לכן התשובה היא : <code>" + KhanUtil.format(solExpr) + "</code>");
        } else {
            steps.add("<p>בעזרת השיטה שניתנה למעלה התקבל :</p><p><code>" + KhanUtil.format(hintExpr) + "</code></p>");
            steps.add("<p class='final_answer'> אנו מקבלים את הביטוי :</p><p><code>" + KhanUtil.format(solExpr) + "</code></p>");
        }
        var hints = KhanUtil.genHints(steps);
        return {solution: solExpr, hints: hints, choices: choices};
    };

    var getNonNumNonVarIFactors = function(factors, occFactors) {
        var listIFactors = [];
        var lastNumOrVarIFactor;
        for (var iFactor = 0; iFactor < occFactors.length; iFactor++) {
            for (var iOcc = 0; iOcc < occFactors[iFactor]; iOcc++) {
                var factor = factors[iFactor];
                if ((!KhanUtil.exprIsNumber(factor)) && (factor.op !== "var")) {
                    listIFactors.push(iFactor);
                } else {
                   lastNumOrVarIFactor = iFactor;
                }
            }
        }
        if (listIFactors.length === 0) {
            listIFactors.push(lastNumOrVarIFactor);
        }
        return listIFactors;
    };

    var genSimplifyingExpressionsExercise = function(nbTerms, maxPower, numFactors, variables, types, withInnerFactor) {
        var factors = [];
        for (var iTerm = 0; iTerm < nbTerms; iTerm++) {
            var term;
            do {
                var type = KhanUtil.randFromArray(types);
                switch (type) {
                    case 0:
                        term = KhanUtil.randFromArray(variables);
                        break;
                    case 1:
                        var variable = KhanUtil.randFromArray(variables);
                        var cst = KhanUtil.randRange(1, 5);
                        term = {op: "+", args: [variable, cst]};
                        break;
                    case 2:
                        var variable = KhanUtil.randFromArray(variables);
                        var cst = KhanUtil.randRange(1, 5);
                        term = {op: "-", args: [variable, cst]};
                        break;
                    case 3:
                        term = KhanUtil.randFromArray(numFactors);
                        break;
                }
            } while (KhanUtil.exprInList(factors, term));
            factors.push(term);
        }
        var sidesOccFactors = [KhanUtil.initOccArray(factors.length), KhanUtil.initOccArray(factors.length)];
        var sidesIFactors = [[], []];
        var extraCommonNum = 1;
        if (withInnerFactor) {
            extraCommonNum = KhanUtil.randFromArray(numFactors);
        }
        var topNum = 1;
        var downNum = 1;
        for (var iFactor = 0; iFactor < factors.length; iFactor++) {
            var factor = factors[iFactor];
            var curMaxPower = maxPower;
            if (KhanUtil.exprIsNumber(factor)) {
               curMaxPower = Math.min(curMaxPower, 2);
            }
            var forbiddenSide = KhanUtil.randRange(0, 2);
            var topPower = KhanUtil.randRange(1, maxPower);
            var downPower = KhanUtil.randRange(1, maxPower);
            if (forbiddenSide === 0) {
                topPower = 0;
            } else if (forbiddenSide === 1) {
                downPower = 0;
            }
            if (KhanUtil.exprIsNumber(factor)) {
                while (Math.abs(extraCommonNum * topNum * Math.pow(factor, topPower) > 80)) {
                    topPower--;
                }
                while (Math.abs(extraCommonNum * downNum * Math.pow(factor, downPower) > 80)) {
                    downPower--;
                }
                topNum *= Math.pow(factor, topPower);
                downNum *= Math.pow(factor, downPower);
            }
            sidesOccFactors[0][iFactor] = topPower;
            sidesOccFactors[1][iFactor] = downPower;
        }
        if (extraCommonNum !== 1) {
            var sidesIFactors = [];
            for (var iSide = 0; iSide < 2; iSide++) {
                sidesIFactors.push(getNonNumNonVarIFactors(factors, sidesOccFactors[iSide]));
            }
            for (var iSide = 0; iSide < 2; iSide++) {
                var pickedFactor = KhanUtil.randFromArray(sidesIFactors[iSide]);
                sidesOccFactors[iSide][pickedFactor]--;
                var factor = {op: "*", args: [extraCommonNum, KhanUtil.exprClone(factors[pickedFactor])]};
                factor = KhanUtil.simplify(factor, {evalBasicNumOps: true, expandProducts: true});
                factors.push(factor);
                sidesOccFactors[iSide].push(1);
                sidesOccFactors[1 - iSide].push(0);
            }
        }
        var exprArgs = [];
        for (var iSide = 0; iSide < 2; iSide++) {
            exprArgs.push(KhanUtil.genExprFromExpFactors(factors, sidesOccFactors[iSide]));
        }
        return {op: "dfrac", args: exprArgs};
    };

    $.extend(KhanUtil, {
        genSimplifyingExpressionsExercise: genSimplifyingExpressionsExercise,
        solveSimplifyingExpressionsExercise: solveSimplifyingExpressionsExercise
    });
})();

