export type User = {
    id: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    sex: 'M' | 'F';
    poste:
      | 'Développeur Web'
      | 'Développeur Mobile'
      | 'Back-end'
      | 'Front-end'
      | 'Chef projet'
      | 'Ophthalmologist';
    year_of_birth: Date;
    email: string;
    username: string;
    password: string;
    admin: false,
    dateCreation: string;
  };