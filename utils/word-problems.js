// Example usage:
// <var>person(1)</var> traveled 5 mi by <var>vehicle(1)</var>. Let
// <var>his(1)</var> average speed be <var>personVar(1)</var>.
// Let <var>person(2)</var>'s speed be <var>personVar(2)</var>.
//
// Note that initials (-Var) are guaranteed to be unique in each category,
// but not across them.

$.extend( KhanUtil, {
	toSentence: function( array, conjunction ) {
		if ( conjunction == null ) 
    {
      if (isNaN(array[0].substr(1, 1)))
       conjunction = "ו";
			else conjunction = "ו-";
		}

		if ( array.length === 0 ) {
			return "";
		} else if ( array.length === 1 ) {
			return array[0];
		} else if ( array.length === 2 ) 
    {
      if (conjunction=="ו")
       return array[0] + " " + conjunction + array[1];
			else return array[0] + " " + conjunction + " " + array[1];
		} else 
    {
      if (conjunction=="ו")
       return array.slice(0, -1).join(", ") + " " + conjunction + array[ array.length - 1 ];
      else
			 return array.slice(0, -1).join(", ") + " " + conjunction + " " + array[ array.length - 1 ];
		}
	},

	toSentenceTex: function( array, conjunction, highlight, highlightClass ) {
		var wrapped = $.map( array, function( elem ) {
			if ( ( $.isFunction( highlight ) && highlight( elem ) ) || ( highlight !== undefined && elem === highlight ) ) {
				return "<code class='" + highlightClass + "'>" + elem + "</code>";
			}
			return "<code>" + elem + "</code>";
		});
		return KhanUtil.toSentence( wrapped, conjunction );
	},

    capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
	// pluralization helper.  There are five signatures
	// - plural(NUMBER): return "s" if NUMBER is not 1
	// - plural(NUMBER, singular):
	//		- if necessary, magically pluralize <singular>
	//		- return "NUMBER word"
	// - plural(NUMBER, singular, plural):
	//		- return "NUMBER word"
	// - plural(singular, NUMBER):
	//		- if necessary, magically pluralize <singular>
	//		- return "word"
	// - plural(singular, plural, NUMBER):
	//		- return "word"
	plural: (function() {
		var oneOffs = {
            "quiz": "quizzes",
            "shelf": "shelves",
            "loaf": "loaves",
            "potato": "potatoes",
            "person": "people",
            "is": "are",
            "was": "were",
            "foot": "feet",
            "square foot": "square feet",
            "tomato": "tomatoes"
		};

		var pluralizeWord = function(word) {

			// noone really needs extra spaces at the edges, do they?
			word = $.trim( word );

			// determine if our word is all caps.  If so, we'll need to
			// re-capitalize at the end
			var isUpperCase = (word.toUpperCase() === word);
			var oneOff = oneOffs[word.toLowerCase()];
			var words = word.split(/\s+/);

			// first handle simple one-offs
			// ({}).watch is a function in Firefox, blargh
			if ( typeof oneOff === "string" ) {
				return oneOff;
			}

			// multiple words
			else if ( words.length > 1 ) {
				// for 3-word phrases where the middle word is 'in' or 'of',
				// pluralize the first word
				if ( words.length === 3 && /\b(in|of)\b/i.test(words[1]) ) {
					words[0] = KhanUtil.plural( words[0] );
				}

				// otherwise, just pluraize the last word
				else {
					words[ words.length-1 ] =
						KhanUtil.plural( words[ words.length-1 ] );
				}

				return words.join(" ");
			}

			// single words
			else {
				// "-y" => "-ies"
				if ( /[^aeiou]y$/i.test( word ) ) {
					word = word.replace(/y$/i, "");
				}

				// add "es"; things like "fish" => "fishes"
				else if ( /[sxz]$/i.test( word ) || /[bcfhjlmnqsvwxyz]h$/.test( word ) ) {
					word += "";
				}

				// all the rest, just add "s"
				else {
					word += "";
				}

				if ( isUpperCase ) {
					word = word.toUpperCase();
				}
				return word;
			}
		};

		return function(value, arg1, arg2) {
			if ( typeof value === "number" ) {
				var usePlural = (value !== 1);

				// if no extra args, just add "s" (if plural)
				if ( arguments.length === 1 ) {
					return usePlural ? "" : "";
				}

				if ( usePlural ) {
					arg1 = arg2 || pluralizeWord(arg1);
				}

				return value + " " + arg1;
				
			} else if ( typeof value === "string" ) {
				var plural = pluralizeWord(value);
				if ( typeof arg1 === "string" && arguments.length >2 ) {
					plural = arg1;
					arg1 = arg2;
				}
				var usePlural = (arguments.length < 2 || (typeof arg1 === "number" && arg1 !== 1));
				return usePlural ? plural : value;
			}
		};
	})()
});

$.fn[ "word-problemsLoad" ] = function() {
var IncrementalShuffler = function(array) {
        // Shuffle an array incrementally so we only use as many random calls
        // as we need, so names can be added/removed without breaking all
        // random seeds for all word problems
        // - get(0); get(0); will use only one call
        // - get(0); get(1); will have each use one random call
        // - get(1); get(0); will use two random calls then none and each call
        //   will give the same result as running 0 then 1
        array = [].slice.call(array, 0);
        var shuffled = 0;

        this.get = function(i) {
            if (i < 0 || i >= array.length) {
                return undefined;
            }

            while (shuffled <= i) {
                var top = array.length - shuffled,
                    newEnd = Math.floor(KhanUtil.random() * top),
                    tmp = array[newEnd];

                array[newEnd] = array[top - 1];
                array[top - 1] = tmp;
                shuffled++;
            }

            // Since we shuffle items from the end to the front, return the
            // items in reverse order
            return array[array.length - i - 1];
        };
    };
    
    var names = [
		["אורית", "f"],
		["עומר", "m"],
		["יוגב", "m"],
		["דניאל", "m"],
		["תמר", "f"],
		["רוני", "f"],
		["שחר", "m"],
		["מיכל", "f"],
		["יוסי", "m"],
		["גיא", "m"],
		["אלעד", "m"],
		["לי", "f"],
		["איתי", "m"],
		["הגר", "f"],
		["איריס", "f"],
		["חן", "f"],
		["יעל", "f"],
		["גל", "m"]
    ];

    // We only want one name per letter of the alphabet, so group people with
    // the same initial before shuffling the names up
    var people = _.map(_.groupBy(names, function(name) {
        return name[0].charAt(0);
    }), function(group) {
        return new IncrementalShuffler(group);
    });
    people = new IncrementalShuffler(people);

	var vehicles = new IncrementalShuffler([
		"אופניים",
		"מכונית",
		"אופנוע",
		"קורקינט",
		"רכבת"
	]);

	var courses = new IncrementalShuffler([
		"אלגברה",
		"כימיה",
		"גאומטריה",
		"היסטוריה",
		"פיזיקה",
		"ספרדית"
	]);

    var exams = new IncrementalShuffler([
		"exam",
		"test",
		"quiz"
	]);

    var binops = new IncrementalShuffler([
		"\\barwedge",
		"\\veebar",
		"\\odot",
		"\\oplus",
		"\\otimes",
		"\\oslash",
		"\\circledcirc",
		"\\boxdot",
		"\\bigtriangleup",
		"\\bigtriangledown",
		"\\dagger",
		"\\diamond",
		"\\star",
		"\\triangleleft",
		"\\triangleright"
	]);

    var collections = new IncrementalShuffler([
		["כסא","כסאות", "שורה","שורות", "לסדר","ב"],
		["מתנה", "מתנות","שקית","שקיות", "למלא","בתוך "],
		["סוכריה","סוכריות","ערימה","ערימות", "ליצור","ב"],
		["ספר","ספרים", "מדף","מדפים" ,"למלא","על "],
		["פחית","פחיות" ,"קופסה", "קופסאות", "למלא","ב"]
	]);

    var stores = new IncrementalShuffler([
		{
			name: "כלי הכתיבה",
            items: new IncrementalShuffler([["עט","עטים"], ["עפרון","עפרונות"], ["מחברת","מחברות"]])
		},
		{
			name: "כלי העבודה",
            items: new IncrementalShuffler([ ["פטיש","פטישים"], ["מסמר","מסמרים"], ["מסור","מסורים"]])
		},
		{
			name: "המכולת",
            items: new IncrementalShuffler([["בננה","בננות"], ["כיכר לחם","כיכרות לחם"], ["קרטון חלב","קרטוני חלב"], ["תפוח אדמה","תפוחי אדמה"]])
		},
		{
			name: "המתנות",
            items: new IncrementalShuffler([["צעצוע","צעצועים"], ["שעון יד","שעוני יד"], ["תמונה","תמונות"]])
		},
		{
			name: "הצעצועים",
            items: new IncrementalShuffler([["כדור","כדורים"], ["משחק מחשב","משחקי מחשב"], ["מכונית מרוץ","מכוניות מרוץ"], ["בובה","בובות"]])
		}
	]);

    var pizzas = new IncrementalShuffler([
		"פיצה",
		"פאי",
		"עוגה"
	]);

	var timesofday = new IncrementalShuffler([
		"בבוקר",
		"בצהריים",
		"בערב",
		"בלילה"
	]);

    var exercises = new IncrementalShuffler([
		["כפיפת בטן","כפיפות בטן"],
		["עליית מתח","עליות מתח"],
		["שכיבת שמיכה","שכיבות שמיכה"]
	]);

    var fruits = new IncrementalShuffler([
		["תפוח","תפוחים"],
		["בננה","בננות"],
		["תות","תותים"],
		["חציל","חצילים"],
		["אפרסק","אפרסקים"],
		["לימון","לימונים"],
		["משמש","משמשים"],
		["נקטרינה","נקטרינות"],
		["תפוז","תפוזים"],
		["רימון","רימונים"],
		["מלון","מלונים"]
    ]);

    var deskItems = new IncrementalShuffler([
		["קלסר","קלסרים","m"],
		["טוש","טושים","m"],
		["מחק","מחקים","m"],
		["תקיה","תקיות","f"],
		["מחוגה","מחוגות","f"],
		["סרגל","סרגלים","m"],
		["מחברת","מחברות","f"],
		["עיפרון","עפרונות","m"],
		["עט","עטים","m"]
	]);

    var colors = new IncrementalShuffler([
		["אדום","אדומים","אדומה","אדומות"],
		["כתום","כתומים","כתומה","כתומות"],
		["צהוב","צהובים","צהובה","צהובות"],
		["ירוק","ירוקים","ירוקה","ירוקות"],
		["כחול","כחולים","כחולה","כחולות"],
		["סגול","סגולים,סגולה","סגולות"],
		["לבן","לבנים","לבנה","לבנות"],
		["שחור","שחורים","שחורה","שחורות"],
		["חום","חומים","חומה","חומות"],
	["ורוד","ורודים","ורודה","ורודות"]	
]);

	var popular = [
		"אופנתי",
		"אופנתיים",
		"אופנתית",
		"אופנתיות"
	];

    var schools = new IncrementalShuffler([
		"בן גוריון",
		"אשל",
		"יצחק רבין",
		"האלון",
		"האורן",
		"הדמוקרטי",
		"שרון"
	]);

    var furnitureStore = new IncrementalShuffler([
        ["כסא","כסאות"],
        ["שולחן","שולחנות"],
        ["מיטה","מיטות"],
        ["ספה","ספות"],
        ["כורסא","כורסאות"],
        ["שידה","שידות"]
    ]);
    var electronicStore = new IncrementalShuffler([
        ["טלויזיה","טלויזיות"],
        ["מחשב","מחשבים"],
        ["טאבלט","טאבלטים"],
        ["מצלמה","מצלמות"]
    ]);
    
    var clothes = new IncrementalShuffler([
		// 0 => male singular, 1 => male plural, 2 => female singular, 3 => female => plural
		["כובע",0,"כובעים"],
		["מכנס",0,"מכנסיים"],
		["חגורה",2,"חגורות"],
		["שרשרת",2,"שרשראות"],
		["ארנק",0,"ארנקים"],

		["חולצה",2,"חולצות"],
		["חצאית",2,"חצאיות"],
		["שעון",0,"שעונים"],
		
		["טרנינג",0,"טרנינגים"],
		["סוודר",0,"סוודרים"],
		["עניבה",2,"עניבות"],
		["צעיף",0,"צעיפים"],
		["שמלה",2,"שמלות"]
	]);

    var sides = new IncrementalShuffler([
		"ימין",
		"שמאל"
	]);

    var shirtStyles = new IncrementalShuffler([
		"long-sleeved",
		"short-sleeved"
	]);

	// animal, avg-lifespan, stddev-lifespan
	// (data is from cursory google searches and wild guessing)
    var animals = new IncrementalShuffler([
		[ "כלב", 9, 5 ],
		[ "חתול", 15, 10 ],
		[ "דוב", 40, 20 ],
		[ "פיל", 60, 10 ],
		[ "עכבר", 3, 1 ],
		[ "דג",   12, 5 ],
		[ "צפרדע", 3, 1 ],
		[ "כריש", 13, 5 ],
		[ "קיפוד", 10, 4 ],
		[ "תרנגול", 6, 2 ],
		[ "נחש", 25, 10 ],
		[ "נמר", 22, 5 ],
		[ "צב", 99, 60 ],
		[ "למור", 14, 5 ]
	]);

    var farmers = new IncrementalShuffler([
		{farmer:["חקלאי","חקלאית"], crops:new IncrementalShuffler(["עגבניות", "תפוחי אדמה", "גזר", "שעועית", "תירס"]), field:"שדה"},
		{farmer:["גנן","גננית"], crops:new IncrementalShuffler(["ורד", "צבעוני", "חרצית", "אירוס", "שושנה"]), field:"גן"}
	]);

    var distances = new IncrementalShuffler([
	    "מייל",
	    "קילומטר"
	]);

    var distanceActivities = new IncrementalShuffler([
		{present:["רוכב","רוכבת"], past:["רכב","רכבה"], noun:"אופניים", part : "באופניים", done:["רכב","רכבה"], continuous:["לרכב","לרכב"]},
		{present:["חותר","חותרת"], past:["חתר","חתרה"], noun:"סירה", part : "בסירה" ,done:["חתר","חתרה"], continuous:["לחתור","לחתור"]},
		{present:["נוסע","נוסעת"], past:["נסע","נסעה"], noun:"רכב", part : "ברכב", done:["נסע","נסעה"], continuous:["לנסוע","לנסוע"]},
		{present:["הולך","הולכת"], past:["הלך","הלכה"], noun:"כלב", part : "עם הכלב", done:["הלך","הלכה"], continuous:["ללכת","ללכת"]},
	]);

	var indefiniteArticle = function(word) {
        var vowels = ["a", "e", "i", "o", "u"];
		if ( _(vowels).indexOf( word[0].toLowerCase() ) > -1 ) {
            return "An " + word;
		}
        return "A " + word;
	};

	$.extend( KhanUtil, {
		person: function( i ) {
            return people.get(i - 1).get(0)[0];
		},

		personVar: function( i ) {
            return String.fromCharCode( Math.min(("z").charCodeAt(0),("a").charCodeAt(0)+(people.get(i - 1).get(0)[0]).charCodeAt(0)-("א").charCodeAt(0)) );
            //return people.get(i - 1).get(0)[0].charAt(0).toLowerCase();
		},
		
		gender: function( i ) {
			return people.get(i - 1).get(0)[1];
		},

		he: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "הוא" : "היא";
		},

		they: function( i1, i2 ) {
			return (people.get(i1 - 1).get(0)[1] === "m" || people.get(i2 - 1).get(0)[1] === "m") ? "הם" : "הן";
		},

		ToHe: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "לו" : "לה";
		},
		He: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "הוא" : "היא";
		},

		him: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "him" : "her";
		},

		his: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "שלו" : "שלה";
		},

		His: function( i ) {
			return people.get(i - 1).get(0)[1] === "m" ? "שלו" : "שלה";
		},

		gender: function( i ) {
			return people.get(i - 1).get(0)[1];
		},

		genderize: function( i, w1,w2 ) {
      if (arguments.length==3)
			 return people.get(i - 1).get(0)[1] === "m" ? w1 : w2;
      else if (w1.charAt(w1.length-1)=="ה")
       return people.get(i - 1).get(0)[1] === "m" ? w1 : w1.substring(0, w1.length-1)+"תה";
      else			
       return people.get(i - 1).get(0)[1] === "m" ? w1 : w1+"ה";
		},
    
		genderize_plural: function( i1, i2, w1,w2 ) {
			return (people.get(i1 - 1).get(0)[1] === "m" || people.get(i2 - 1).get(0)[1] === "m") ? w1 : w2;
		},
    
		An: function(word) {
			return indefiniteArticle(word);
		},

		an: function(word) {
			return indefiniteArticle(word).toLowerCase();
		},

		vehicle: function( i ) {
            return vehicles.get(i - 1);
		},

		vehicleVar: function( i ) {
            return vehicles.get(i - 1).charAt(0);
		},

		course: function( i ) {
            return courses.get(i - 1);
		},

		courseVar: function( i ) {
            return courses.get(i - 1).charAt(0).toLowerCase();
		},

		exam: function( i ) {
            return exams.get(i - 1);
		},

		binop: function( i ) {
            return binops.get(i - 1);
		},

		item: function( i ) {
            return collections.get(i - 1)[0];
		},
    
		items: function( i ) {
            return collections.get(i - 1)[1];
		},

		group: function( i ) {
            return collections.get(i - 1)[2];
		},
    
 		groups: function( i ) {
            return collections.get(i - 1)[3];
		},
    
		groupVerb: function( i ) {
            return collections.get(i - 1)[4];
		},

		group_prop: function( i ) {
            return collections.get(i - 1)[5];
		},


		store: function( i ) {
            return stores.get(i).name;
		},

		storeItem: function( i, j ) {
            return stores.get(i).items.get(j)[0];
		},
		storeItems: function( i, j ) {
            return stores.get(i).items.get(j)[1];
		},

		pizza: function( i ) {
            return pizzas.get(i);
		},

		exercise: function( i ) {
            return exercises.get(i - 1)[0];
		},
		exercise_plural: function( i ) {
            return exercises.get(i - 1)[1];
		},

		timeofday: function( i ) {
            return timesofday.get(i - 1);
		},

		school: function( i ) {
            return schools.get(i - 1);
		},

		clothing: function( i ) {
            return clothes.get(i - 1)[0];
		},
		clothing_plural: function( i ) {
            return clothes.get(i - 1)[2];
		},
    
		color: function( i ) {
            return colors.get(i - 1);
		},

		clothing_color: function( i ) {
            return  colors.get(i - 1)[clothes.get(i - 1)[1]];
		},

		clothing_popular: function( i ) {
            return  popular[clothes.get(i - 1)[1]];
		},

		fruit: function( i ) {
            return fruits.get(i)[0];
		},
    
		fruit_plural: function( i ) {
            return fruits.get(i)[1];
    },

		deskItem: function( i ) {
            return deskItems.get(i)[0];
		},
    
		deskItem_plural: function( i ) {
            return deskItems.get(i)[1];
		},
    
		deskItem_gender: function( i ) {
            return deskItems.get(i)[2];
		},

        distance: function(i) {
            return distances.get(i - 1);
		},

		rode: function( i ) {
		        return people.get(i - 1).get(0)[1] === "m" ? distanceActivities.get(i - 1).past[0] : distanceActivities.get(i - 1).past[1];
            //return distanceActivities.get(i - 1).past;
		},

		ride: function( i) {
            return people.get(i - 1).get(0)[1] === "m" ? distanceActivities.get(i - 1).present[0] : distanceActivities.get(i - 1).present[1];
		},
		

		bike: function( i ) {
            return distanceActivities.get(i - 1).noun;
		},

    bike_part: function( i ) {
        return distanceActivities.get(i - 1).part;
    },
        
		biked: function( i ) {
            return people.get(i - 1).get(0)[1] === "m" ? distanceActivities.get(i - 1).done[0] :  distanceActivities.get(i - 1).done[1];
		},

		biking: function( i ) {
            return distanceActivities.get(i - 1).continuous[0];
		},
		farmer: function( i ) {
            return people.get(i - 1).get(0)[1] === "m" ?  farmers.get(i - 1).farmer[0] : farmers.get(i - 1).farmer[1];
		},
		
		
		crop: function( i ) {
            return farmers.get(i - 1).crops.get(0);
		},

		field: function( i ) {
            return farmers.get(i - 1).field;
		},

		side: function( i ) {
            return sides.get(i - 1);
		},

		shirtStyle: function( i ) {
            return shirtStyles.get(i - 1);
		},

    furniture: function(i) {
        return furnitureStore.get(i - 1)[0];
    },
    furnitures: function(i) {
        return furnitureStore.get(i - 1)[1];
    },
    electronic: function(i) {
        return electronicStore.get(i - 1)[0];
    },
    electronics: function(i) {
        return electronicStore.get(i - 1)[1];
    },
		animal: function( i ) {
            return animals.get(i - 1)[0];
		},

		animalAvgLifespan: function( i ) {
            return animals.get(i - 1)[1];
		},

		animalStddevLifespan: function( i ) {
            return animals.get(i - 1)[2];
		}
	});
};
