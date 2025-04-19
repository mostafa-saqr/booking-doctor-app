export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availability: string;
  location: string;
}

export const specialties = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Pediatrics',
  'Psychiatry'
];

export const availabilityOptions = [
  'Available Today',
  'Available This Week',
  'Available Next Week'
];

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    availability: 'Available Today',
    location: 'Downtown Medical Center'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    availability: 'Available This Week',
    location: 'Westside Clinic'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    availability: 'Available Next Week',
    location: 'Children\'s Hospital'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    availability: 'Available Today',
    location: 'Neurological Institute'
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    specialty: 'Endocrinology',
    availability: 'Available This Week',
    location: 'Metro Health Center'
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    specialty: 'Gastroenterology',
    availability: 'Available Next Week',
    location: 'Digestive Health Center'
  },
  {
    id: 7,
    name: 'Dr. Maria Garcia',
    specialty: 'Oncology',
    availability: 'Available Today',
    location: 'Cancer Treatment Center'
  },
  {
    id: 8,
    name: 'Dr. David Kim',
    specialty: 'Psychiatry',
    availability: 'Available This Week',
    location: 'Mental Health Clinic'
  },
  {
    id: 9,
    name: 'Dr. Jennifer Lee',
    specialty: 'Cardiology',
    availability: 'Available Next Week',
    location: 'Heart Care Center'
  },
  {
    id: 10,
    name: 'Dr. Thomas Anderson',
    specialty: 'Dermatology',
    availability: 'Available Today',
    location: 'Skin Care Clinic'
  },
  {
    id: 11,
    name: 'Dr. Patricia Brown',
    specialty: 'Endocrinology',
    availability: 'Available This Week',
    location: 'Metro Health Center'
  },
  {
    id: 12,
    name: 'Dr. William Clark',
    specialty: 'Gastroenterology',
    availability: 'Available Next Week',
    location: 'Digestive Health Center'
  },
  {
    id: 13,
    name: 'Dr. Elizabeth White',
    specialty: 'Neurology',
    availability: 'Available Today',
    location: 'Neurological Institute'
  },
  {
    id: 14,
    name: 'Dr. Richard Moore',
    specialty: 'Oncology',
    availability: 'Available This Week',
    location: 'Cancer Treatment Center'
  },
  {
    id: 15,
    name: 'Dr. Susan Hall',
    specialty: 'Pediatrics',
    availability: 'Available Next Week',
    location: 'Children\'s Hospital'
  },
  {
    id: 16,
    name: 'Dr. Charles Young',
    specialty: 'Psychiatry',
    availability: 'Available Today',
    location: 'Mental Health Clinic'
  }
]; 