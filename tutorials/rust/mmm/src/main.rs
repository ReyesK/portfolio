// take a list of integers, return mean, median and mode
mod integer_list;

use std::io;

fn main() {
    loop {
        println!("Enter a comma separated list of integers (any non integer input will be ignored): \n(example: 1,2,3,4)");

        let input: String = read_from_stdin(); // get user input
        let input_split: Vec<&str> = input.trim().split(',').collect(); // trim it, split it, put it in a vector

        let mut nums: Vec<i64> = Vec::new(); // create vector to hold parsed values

        // i needs to be able to be parsed to an i64, if not we ignore it.
        for i in input_split {
            // tell parse what type we're looking for
            if let Ok(num) = i.trim().parse::<i64>() {
                nums.push(num); // add to nums vector if success
            }
        }

        // no integers given. try again.
        if nums.len() == 0 {
            continue;
        }

        nums.sort(); // sort nums asc
        println!("Your list sorted: {:?}", nums);

        let int_list = integer_list::IntegerList::new(nums); // put sorted nums into an IntegerList

        // print mean
        match int_list.mean() {
            Ok(i) => println!("mean: {}", i),
            Err(e) => println!("{}", e),
        }
        // print median
        println!("median: {}", int_list.median());
        // print mode
        match int_list.mode() {
            Ok(i) => println!("mode(s): {:?}", i),
            Err(e) => println!("{}", e),
        }

        println!("Quit? (Y or y quits the program.)");
        let quit = read_from_stdin();

        match quit.to_uppercase().trim() {
            "Y" => break,
            _ => continue,
        }
    }
}

// get user input from stdin and return the String
fn read_from_stdin() -> String {
    let mut s = String::new();
    io::stdin().read_line(&mut s).expect("Failed to read_line");

    s
}
