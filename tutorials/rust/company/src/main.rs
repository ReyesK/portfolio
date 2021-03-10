// add people to departments in the company.
// Add {name} to {department} (ex. Add Sally to Engineering)
// list all people in company alphabetically
// list all pepople in a department alphabetically

mod company;

use crate::company::Company;

use regex::Regex;
use std::io;

fn main() {
    println!("Add or list people in the company (q to quit)");
    let mut company = Company::new();
    loop {
        let input = read_from_stdin();

        match input.trim() {
            "q" => break,
            cmd => {
                let re = Regex::new(r"(?i)^(\badd\b|\blist\b)(?:(.+)\bto\b(.+)|(.+))*").unwrap();
                
                match re.captures(cmd) {
                    Some(caps) => {
                        // capture 0 contains entire match
                        // add or list will be in capture 1,
                        //if cmd follows the add format the captures will be in 2 (name), 3 (department).
                        //if cmd looks like a list command, the capture is in 4
                        let parsed: Vec<Option<&str>> = caps
                            .iter()
                            .map(|m| m.map_or(None, |v| Some(v.as_str().trim())))
                            .collect();

                        // lowercase the 'command' part of the capture for ez match
                        let command: &str = &parsed[1].unwrap().to_lowercase(); // here parsed[1] will always be Some, so I'm ok with using unwrap to be concise

                        match (command, parsed[2], parsed[3], parsed[4]) {
                            ("add", Some(name), Some(department), None) => {
                                // add person to department
                                company.add_person_to_department(name, department);
                            }
                            ("list", None, None, None) => {
                                // list all the people
                                company.list_people();
                            }
                            ("list", None, None, Some(department)) => {
                                // list the people in department
                                company.list_people_in_department(department);
                            }
                            _ => {
                                println!("invalid command");
                                continue;
                            }
                        }
                    }
                    None => {
                        println!("invalid command");
                        continue;
                    }
                };
            }
        }
    }
}

fn read_from_stdin() -> String {
    let mut s = String::new();
    io::stdin().read_line(&mut s).expect("Failed to read_line");

    s
}
