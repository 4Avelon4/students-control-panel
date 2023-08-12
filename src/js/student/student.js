import dateFormatter from '../helpers/dateFormatter';

export default class Student {
  constructor(id, name, surname, lastname, faculty, birthday, studyStart) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.lastname = lastname;
    this.faculty = faculty;
    this.birthday = birthday;
    this.studyStart = studyStart;
  }

  get fio() {
    return `${this.surname} ${this.name} ${this.lastname}`;
  }

  getEducationPeriod() {
    const currentTime = new Date();
    const month = currentTime.getMonth();
    const timeTest = currentTime.getFullYear() - this.studyStart;
    if (timeTest > 4 || (timeTest === 4 && month > 8)) {
      const female = /.*а$/.test(this.name);

      if (female) {
        return '(закончила)';
      }

      return '(закончил)';
    }

    return `(${timeTest} курс)`;
  }

  getBirthdayString() {
    const data = dateFormatter(this.birthday);

    return `${data.dd}.${data.mm}.${data.yyyy}`;
  }

  getBirthdayStringInInput() {
    const data = dateFormatter(this.birthday);

    return `${data.yyyy}-${data.mm}-${data.dd}`;
  }

  getAge() {
    const studentBirthday = new Date(this.birthday);

    const today = new Date();
    let age = today.getFullYear() - studentBirthday.getFullYear();
    const m = today.getMonth() - studentBirthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < studentBirthday.getDate())) {
      age--;
    }
    return age;
  }
}
