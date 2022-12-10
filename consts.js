const dataExample = [
  {
    Employee: 'Pedro',
    monday: 0,
    tuesday: 4,
    wednesday: 5,
    thursday: 7,
    friday: 3.5,
    saturday: 7,
    sunday: 2.5,
    totalHours: 22,
  },
  {
    Employee: 'Jose Luis',
    monday: 0,
    tuesday: 4,
    wednesday: 5,
    thursday: 7,
    friday: 3.5,
    saturday: 0,
    sunday: 2.5,
    totalHours: 22,
  },
];

const headers = [
  'Empleado',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
  'Horas totales',
];
module.exports = { dataExample, headers };
