use std::io;

const CELSIUS : &str = "\u{2103}";
const FAHRENHEIT : &str = "\u{2109}";

fn main() {

    println!("Welcome to the temperature converter! \nConvert temperatures between Fahrenheit and Celsius");
    // prompt for input unit type (F or C)
    println!("Select your input unit: \n(F) Fahrenheit \n(C) Celsius");
    loop {
        let mut unit_type = String::new();

        io::stdin()
            .read_line(&mut unit_type)
            .expect("Failed to read line.");

        match unit_type.to_uppercase().trim() {
            "F" => {
                let deg = get_degree();
                let result = (deg - 32) * 5/9;
                println!("{}{} is {}{}", deg, FAHRENHEIT, result, CELSIUS);
                break;
            }
            "C" => {
                let deg = get_degree();
                let result = (deg * 9/5) + 32;
                println!("{}{} is {}{}", deg, CELSIUS, result, FAHRENHEIT);
                break;
            },
            _ => println!("invalid input"),
        }
    }
}

fn get_degree() -> i32 {
    println!("Input degree to convert: ");
    loop {
        let mut deg = String::new();
        io::stdin()
            .read_line(&mut deg)
            .expect("Failed to read line.");

        let _deg : i32 = match deg.trim().parse() {
            Ok(n) => break n,
            Err(_) => {
                println!("degree must be a number");
                continue;
            }
        };
    }
}
