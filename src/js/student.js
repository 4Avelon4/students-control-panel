export default class Student {
  constructor(name, surname, lastname, faculty, birthDate, yearStudy) {
    this.name = name;
    this.surname = surname;
    this.lastname = lastname;
    this.faculty = faculty;
    this.birthDate = birthDate;
    this.yearStudy = yearStudy;
  }

  get fio() {
    return `${this.surname} ${this.name} ${this.lastname}`;
  }

  getEducationPeriod() {
    const currentTime = new Date();
    const month = currentTime.getMonth();
    const timeTest = currentTime.getFullYear() - this.yearStudy;
    if (timeTest > 4 || (timeTest === 4 && month > 8)) {
      const female = /.*а$/.test(this.name);

      if (female) {
        return '(закончила)';
      }

      return '(закончил)';
    }

    return `(${timeTest} курс)`;
  }

  getBirthDateString() {
    const yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth() + 1;
    let dd = this.birthDate.getDate();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    return `${dd}.${mm}.${yyyy}`;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
