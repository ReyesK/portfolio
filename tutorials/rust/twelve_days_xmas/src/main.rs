
const LYRICS: [[&str; 2]; 12] = [
        ["first", "a partridge in a pear tree!"],
        ["second", "two turtle doves"],
        ["third", "three french hens"],
        ["fourth", "four calling birds"],
        ["fifth", "FIVE GOLDEN RINGS"],
        ["sixth", "six geese a-laying"],
        ["seventh", "seven swans a-swimming"],
        ["eighth", "eight maids a-milking"],
        ["ninth", "nine ladies dancing"],
        ["tenth", "ten lords a-leaping"],
        ["eleventh", "eleven pipers piping"],
        ["twelfth", "twelve drummers drumming"]
    ];

fn main() {
    println!("THE TWELVE DAYS OF CHRISTMAS");
    for (i, day_lyrics) in LYRICS.iter().enumerate() {
        println!("On the {} day of Christmas my true love gave to me {}", day_lyrics[0], day_lyrics[1]);
        for x in (0..i).rev() {
            if x == 0 {
                println!("and {}", LYRICS[x][1]);
            } else {
                println!("{}", LYRICS[x][1]);
            }
        }
    }
}
