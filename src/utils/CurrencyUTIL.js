export function  toMillion(value)
{
    if(value<0){
        
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : "$"+-(Math.abs(Number(value))/ 1.0e6).toFixed(2)+"M";
    }else{
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
        : "$"+(Math.abs(Number(value))/ 1.0e6).toFixed(2)+"M";
    }
}  
export function  toMillionRounded(value)
{
    if(value<0){
        
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : "$"+-(Math.abs(Number(value))/ 1.0e6).toFixed(0)+"M";
    }else{
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(0) + "M"
        : "$"+(Math.abs(Number(value))/ 1.0e6).toFixed(0)+"M";
    }
}  
export function  toMillionConversion(value)
    {
        return Math.abs(Number(value)) >= 1.0e9
        ? (Math.abs(Number(value)) / 1.0e9).toFixed(2)
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
        : (Math.abs(Number(value))).toFixed(2);
    } 
    export function  toMillionWithNoDollar(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "("+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "("+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
                    :  "("+(Math.abs(Number(value))/ 1.0e6).toFixed(2) + ")";
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : (Math.abs(Number(value))/ 1.0e6).toFixed(2)
        }
    }

    export function  toMillionWithNoDollar1(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+ (Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "("+ (Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "("+ (Math.abs(Number(value)) / 1.0e6).toFixed(2) + ")"
                    :  "("+(Math.abs(Number(value))/ 1.0e6).toFixed(2) + ")";
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : (Math.abs(Number(value))/ 1.0e6).toFixed(2)
        }
    }

export function toVariance(Current_value,Previous_value){
    let data = ((Current_value-Previous_value)/Previous_value)*100
    if(data != "Infinity" && !isNaN(data)){
        return data.toFixed(2) + '%' 

    }else {
        return '-%'
    }
    
}