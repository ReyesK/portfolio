use std::cmp::Ordering;
use std::fmt;


#[derive(Debug, Eq, Clone)]
pub struct Person {
    name: String,
}

impl Person {
    pub fn new(name: String) -> Person {
        Person { name }
    }
}

impl Ord for Person {
    fn cmp(&self, other: &Self) -> Ordering {
        self.name.cmp(&other.name)
    }
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.name == other.name
    }
}

// a wrapper for Vec<Person> just so we can format the output
pub struct PersonVec(pub Vec<Person>);

impl PersonVec {
    pub fn new(people: Vec<Person>) -> PersonVec {
        PersonVec(people)
    }
}

// print all the people in alphabetical order, each on their own line.
impl fmt::Display for PersonVec {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let people = &mut self.0.to_vec();
        people.sort();
        let output: &str = &people
            .iter()
            .map(|p| p.name.clone())
            .collect::<Vec<String>>()
            .join("\n");
        write!(f, "{}", output)
    }
}