mod person;

use self::person::{Person, PersonVec};

use std::collections::HashMap;

pub struct Company {
    departments: HashMap<String, PersonVec>,
}

impl Company {
    pub fn new() -> Company {
        Company {
            departments: HashMap::new(),
        }
    }
    pub fn add_person_to_department(&mut self, person_name: &str, department_name: &str) {
        let new_person = Person::new(person_name.to_string());
        match self.departments.get_mut(department_name) {
            Some(dept) => {
                dept.0.push(new_person);
            }
            _ => {
                self.departments.insert(
                    department_name.to_string(),
                    PersonVec::new(vec![new_person]),
                );
            }
        }
        println!("Added {} to {}", person_name, &department_name);
    }

    pub fn list_people(&self) {
        let mut people: PersonVec = PersonVec::new(Vec::new());

        for (_dept, dept_people) in self.departments.iter() {
            let mut p = dept_people.0.to_vec();
            people.0.append(&mut p);
        }
        println!("All people in company: \n{}", people);
    }

    pub fn list_people_in_department(&self, department_name: &str) {
        match self.departments.get(department_name) {
            Some(people) => {
                println!("People in {}: \n{}", department_name, people);
            }
            _ => println!("{} doesn't exist.", department_name),
        }
    }
}

