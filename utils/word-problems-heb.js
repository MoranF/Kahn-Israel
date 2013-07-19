// Example usage:
// <var>person(1)</var> traveled 5 mi by <var>vehicle(1)</var>. Let                               
// <var>his(1)</var> average speed be <var>personVar(1)</var>.
// Let <var>person(2)</var>'s speed be <var>personVar(2)</var>.
//
// Note that initials (-Var) are guaranteed to be unique in each category,
// but not across them.
	$.extend( KhanUtil, {
	
  	plural_heb : (function (){
		
  		var pluralizeWord = function (word){
  			return word + "ים";	
  		}
  			
  		return function (value, arg1, arg2, gender,arg3){
  			if ( typeof value === "number" ) {
  				var usePlural = (value !== 1);
  
  				// if no extra args, just add "s" (if plural)
  				if ( arguments.length === 1 ) {
  					return usePlural ? "ים" : "";
  				}
   				if ( arguments.length === 2 ) {
  					return value + " " + arg1 + (usePlural ? "ים" : "");
  				} 
  				if ( usePlural ) {
  					arg1 = arg2 || pluralizeWord(arg1);
  				}
  				var one = (gender == 'f' ) ? 'אחת' : 'אחד';
          if (arguments.length === 5) 				
           { 
           return (value == 1) ? arg3 + arg1 + " " + one : arg3 + "-" + value + " " + arg1;
           }
          else
           { 
           return (value == 1) ? arg1 + " " + one : value + " " + arg1;
           }
          
  			} else if ( typeof value === "string" ) {
  				var plural = pluralizeWord(value);
  				if ( typeof arg1 === "string" && arguments.length === 3 ) {
  					plural = arg1;
  					arg1 = arg2;
  				}            				
  				var usePlural = (arguments.length < 2 || (typeof arg1 === "number" && arg1 !== 1));
  				return usePlural ? plural : value;
  			}
  		};
  	})(),
    
    //pluarlizes just the word without adding the number of the result 
    plural_heb_word : function (value, arg1, arg2)
    {
      return (value==1)? arg1 : arg2 ;
    },
    
  	definite_heb : function (arg1)
    {
       var spc = arg1.lastIndexOf(" ");
       if (spc > -1)
       {
        return arg1.substring(0,spc+1) + "ה"+ arg1.substring(spc+1);
       }
       else
       {
        return "ה"+arg1;
       }      
    },
     plural_heb_verb : function (value, arg1, arg2)
    {
      return (value==1)? arg1 : arg2 ;
    },
    
  	definite_heb : function (arg1)
    {
       var spc = arg1.lastIndexOf(" ");
       if (spc > -1)
       {
        return arg1.substring(0,spc+1) + "ה"+ arg1.substring(spc+1);
       }
       else
       {
        return "ה"+arg1;
       }      
    },

	
		plant : function ( i ) {
			return KhanUtil.gender(i) === "m" ? 'שתל' : 'שתלה';
		},
    
		plant : function ( i ) {
			return KhanUtil.gender(i) === "m" ? 'שתל' : 'שתלה';
		},		
		started : function (i){
			return KhanUtil.gender(i) === "m" ? 'התחיל' : 'התחילה';
		},
		
		young : function (i){
      return KhanUtil.gender(i) === "m" ? "צעיר":"צעירה";			
    },	
    
		was : function (i){
      return KhanUtil.gender(i) === "m" ? "היה":"היתה";			
    },
    	
		willbe : function (i){
      return KhanUtil.gender(i) === "m" ? "יהיה":"תהיה";			
    },	
    
		old : function (i){
      return KhanUtil.gender(i) === "m" ? "מבוגר":"מבוגרת";			
    },	
    
		big : function (i){
      return KhanUtil.gender(i) === "m" ? "גדול":"גדולה";			
    },	
    
		son : function (i){
      return KhanUtil.gender(i) === "m" ? "בן":"בת";			
    },	
    
		onhim : function (i){
      return KhanUtil.gender(i) === "m" ? "עליו":"עליה";			
    },	
        
		tohim : function (i){
      return KhanUtil.gender(i) === "m" ? "לו":"לה";			
    },	    
		years_heb : function (n){
		  if (n==1)
		   return "שנה";
      else if (n==2)
		   return "שנתיים";
		  else 
		   return KhanUtil.cardinalHeb(n) + " שנים";
		}
		
    			
	});

