const parseDate = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let dayOfBirthday = date.split('/');

  dayOfBirthday = `${dayOfBirthday[2]}-${dayOfBirthday[1]}-${dayOfBirthday[0]}`;
  dayOfBirthday = new Date(Date.parse(dayOfBirthday));

  const dayOfBirthdayNow = new Date(today.getFullYear(), dayOfBirthday.getMonth(), dayOfBirthday.getDate());

  let age = today.getFullYear() - dayOfBirthday.getFullYear();

  if (today < dayOfBirthdayNow) {
    age -= 1;
  }

  return age;
};

export default parseDate;
