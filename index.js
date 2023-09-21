// age
var current_year = new Date().getFullYear()
var birth_year   = 2006;
var age          = current_year - birth_year;

// Career
var career = "High School Student";

// Insert into HTML
var age_para    = document.getElementById("age");
var career_para = document.getElementById("career")

age_para.textContent    = age;
career_para.textContent = career;
