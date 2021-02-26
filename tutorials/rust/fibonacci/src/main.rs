use std::io;

fn main() {
    // get n from user input, convert to u64
    println!("I will generate the nth Fibonacci number!");
    loop {
        println!("Enter a number:");
        let n = read_from_stdin();
        let n : u64 = match n.trim().parse() {
            Ok(n) => n,
            Err(_) => {
                println!("must be a positive number...");
                continue;
            }
        };


        println!("Result: {}", fib(n));
        println!("Go again? (anything other than 'Y' or 'y' exits)");

        let cont = read_from_stdin();

        match cont.to_uppercase().trim() {
            "Y" => continue,
            _ => break,
        }
    }

}

fn fib(n: u64) -> u64 { // do the stuff
    let mut a = 0;
    let mut b = 1;
    let mut c;

    if n == 0 {
        n
    } else {
        for _ in 1..(n) {
            c = a + b;
            a = b;
            b = c;
        }
        b
    }
}

fn read_from_stdin() -> String {
    let mut s = String::new();
    io::stdin()
        .read_line(&mut s)
        .expect("Failed to read_line");

    s
}
