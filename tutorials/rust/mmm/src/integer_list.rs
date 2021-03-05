use std::collections::HashMap;
use std::convert::TryFrom;

#[derive(Debug)]
pub struct IntegerList(Vec<i64>);

impl IntegerList {
    pub fn new(ints: Vec<i64>) -> IntegerList { IntegerList(ints) }

    pub fn mean(&self) -> Result<i64, &str> {
        // get sum of integers in vector
        let sum: i64 = self.0.iter().sum();

        // use try_from because converting to i64 could fail.
        match i64::try_from(self.0.len()) {
            Ok(length) => Ok(sum / length),
            Err(_) => Err("error calculating mean: could not convert usize to i64"),
        }
    }

    pub fn median(&self) -> i64 {
        let length = self.0.len();
        match length % 2 {
            // odd or even?
            0 => {
                // do even median calculation
                let idx1 = length / 2;
                let idx2 = idx1 + 1;
                (self.0[idx1] + self.0[idx2]) / 2
            }
            _ => {
                // get index of median
                self.0[length / 2]
            }
        }
    }

    pub fn mode(&self) -> Result<Vec<i64>, &str> {
        // return integers with the highest frequency
        let mut occurrances = HashMap::new();

        // count occurrances of each integer & set the value for most occurrances
        let mut most = 1;
        for i in &self.0 {
            let occ = occurrances.entry(i).or_insert(0);
            *occ += 1;
            if occ > &mut most {
                most = *occ;
            }
        }

        match most {
            1 => Err("No mode found."),
            _ => {
                let mut modes: Vec<i64> = occurrances
                    .into_iter()
                    .filter_map(|(k, v)| if v == most { Some(*k) } else { None }) // get keys for values that are equal to most
                    .collect();
                modes.sort();
                Ok(modes)
            }
        }
    }
}
