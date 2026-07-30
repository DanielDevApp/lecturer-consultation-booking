export type LecturerStatus = "available" | "booked" | "away";

export type Lecturer = {
  slug: string;
  name: string;
  department: string;
  role: string;
  room: string;
  next: string;
  status: LecturerStatus;
  initials: string;
  availability: string[];
  bio: string;
  focus: string[];
};

export const LECTURERS: Lecturer[] = [
  {
    slug: "amara-owusu",
    name: "Dr. Amara Owusu",
    department: "Computer Science",
    role: "Senior Lecturer",
    room: "CS 204",
    next: "Today · 2:00 PM",
    status: "available",
    initials: "AO",
    availability: ["Today · 2:00 PM", "Today · 3:15 PM", "Wed · 10:30 AM"],
    bio: "Specialises in software engineering and student mentoring at GCTU.",
    focus: ["Project guidance", "Coding review", "Exam prep"],
  },
  {
    slug: "kwesi-mensah",
    name: "Prof. Kwesi Mensah",
    department: "Information Technology",
    role: "Professor",
    room: "IT 118",
    next: "Wed · 10:30 AM",
    status: "booked",
    initials: "KM",
    availability: ["Wed · 10:30 AM", "Thu · 4:00 PM", "Fri · 9:00 AM"],
    bio: "Leads research seminars and helps students bridge theory with industry practice.",
    focus: ["Research support", "Essay feedback", "Course advising"],
  },
  {
    slug: "linda-boateng",
    name: "Dr. Linda Boateng",
    department: "Mathematics",
    role: "Associate Professor",
    room: "MATH 312",
    next: "Thu · 1:00 PM",
    status: "away",
    initials: "LB",
    availability: ["Thu · 1:00 PM", "Fri · 11:30 AM", "Mon · 9:00 AM"],
    bio: "Creates structured problem-solving sessions for engineering students.",
    focus: ["Calculus support", "Proof techniques", "Revision clinics"],
  },
  {
    slug: "efua-addo",
    name: "Dr. Efua Addo",
    department: "Computer Science",
    role: "Lecturer",
    room: "CS 045",
    next: "Today · 4:15 PM",
    status: "available",
    initials: "EA",
    availability: ["Today · 4:15 PM", "Tue · 11:00 AM", "Fri · 2:30 PM"],
    bio: "Supports students with lab work, algorithms, and capstone projects.",
    focus: ["Lab reports", "Algorithms", "Capstone prep"],
  },
  {
    slug: "yaw-darko",
    name: "Prof. Yaw Darko",
    department: "Telecommunications",
    role: "Professor",
    room: "TEL 210",
    next: "Fri · 9:00 AM",
    status: "available",
    initials: "YD",
    availability: ["Fri · 9:00 AM", "Mon · 3:00 PM", "Wed · 1:30 PM"],
    bio: "Expert in network systems and wireless communication at GCTU.",
    focus: ["Network design", "Thesis review", "Industry projects"],
  },
  {
    slug: "akosua-frema",
    name: "Dr. Akosua Frema",
    department: "Business Administration",
    role: "Senior Lecturer",
    room: "BUS 088",
    next: "Mon · 11:00 AM",
    status: "booked",
    initials: "AF",
    availability: ["Mon · 11:00 AM", "Tue · 2:00 PM", "Thu · 10:00 AM"],
    bio: "Guides students through entrepreneurship and business strategy modules.",
    focus: ["Business plans", "Case studies", "Presentation skills"],
  },
];

export const DEPARTMENTS = [
  "All departments",
  ...Array.from(new Set(LECTURERS.map((l) => l.department))).sort(),
];
