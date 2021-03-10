// convert strings to pig latin
use std::io;

fn main() {
    println!("Hello, what would you like to translate to pig latin? (q to quit at any time)");

    loop {
        match read_from_stdin().trim() {
            "q" => break,
            input => {
                let words: Vec<&str> = input.split_whitespace().collect();

                match words.len() {
                    0 => {
                        // no words, no work.
                        println!("o-nay ords-way o-tay ranslate-tay");
                        continue;
                    }
                    _ => {
                        println!("{}", translate(words));
                    }
                }
            }
        }
    }        
}

fn translate(words: Vec<&str>) -> String {
    words
        .into_iter()
        .map(|word| {
            let ch = word.to_uppercase().chars().next().unwrap(); // get the first character in uppercase

            if ['A', 'E', 'I', 'O', 'U'].iter().any(|&c| c == ch) {
                // word starts with a vowel just add -hay
                [word, "-hay"].concat()
            } else {
                // word starts with a consonant move the first char to the end with ay
                [&word[1..], "-", &word[..1], "ay"].concat()
            }
        })
        .collect::<Vec<String>>()
        .join(" ")
}

fn read_from_stdin() -> String {
    let mut s = String::new();
    io::stdin().read_line(&mut s).expect("Failed to read_line");

    s
}
