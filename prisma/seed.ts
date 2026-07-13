import 'dotenv/config'
import { PrismaClient, InquiryType, InquiryStatus } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const FIRST_NAMES = [
  'John', 'Sarah', 'Michael', 'Emily', 'Christopher', 'Amanda', 'David', 'Jessica', 
  'James', 'Ashley', 'Robert', 'Jennifer', 'William', 'Linda', 'Daniel', 'Elizabeth', 
  'Matthew', 'Barbara', 'Anthony', 'Susan', 'Mark', 'Jessica', 'Donald', 'Sarah', 
  'Steven', 'Karen', 'Paul', 'Nancy', 'Andrew', 'Lisa', 'Joshua', 'Betty', 'Kenneth', 
  'Margaret', 'Kevin', 'Sandra', 'Brian', 'Ashley', 'George', 'Kimberly', 'Timothy', 
  'Emily', 'Ronald', 'Donna', 'Edward', 'Michelle', 'Jason', 'Dorothy', 'Jeffrey', 
  'Carol', 'Ryan', 'Amanda', 'Jacob', 'Melissa', 'Gary', 'Deborah', 'Nicholas', 
  'Stephanie', 'Eric', 'Rebecca', 'Jonathan', 'Sharon', 'Stephen', 'Laura', 'Larry', 
  'Cynthia', 'Justin', 'Kathleen', 'Scott', 'Amy', 'Brandon', 'Shirley', 'Benjamin', 
  'Angela', 'Samuel', 'Helen', 'Gregory', 'Anna', 'Alexander', 'Brenda'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 
  'Carter', 'Roberts'
];

const EMAIL_PROVIDERS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

const MESSAGES = [
  'Looking for a kitchen remodeling estimate for a 200 sq ft space.',
  'I need a bathroom renovation quote, specifically for the master bath.',
  'Requesting a drywall repair for several cracks in the living room.',
  'Would like to get a quote for fence installation in the backyard.',
  'Interested in deck construction, approximately 20x15 feet.',
  'Need interior painting for three bedrooms and a hallway.',
  'Plumbing repair needed for a leaking sink in the kitchen.',
  'Electrical work required for installing new recessed lighting.',
  'Looking for flooring replacement in the entire basement.',
  'Requesting a roof inspection after the last storm.',
  'Water damage repair needed in the laundry room.',
  'Window replacement for the front of the house.',
  'Interested in a new front door installation.',
  'General project questions regarding home renovations.',
  'Had a question regarding my recent invoice.',
  'Contractor partnership inquiry for upcoming projects.',
  'Employment application for a skilled carpenter.',
  'Requesting a renovation progress update on my project.'
];

// Helper functions
const getRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const getWeightedItem = <T>(weightedItems: { item: T, weight: number }[]): T => {
  const totalWeight = weightedItems.reduce((acc, curr) => acc + curr.weight, 0);
  let random = Math.random() * totalWeight;
  for (const { item, weight } of weightedItems) {
    if (random < weight) return item;
    random -= weight;
  }
  return weightedItems[0].item;
};

const generateRandomDate = (daysBack: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date;
};

const generateUSPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 800 + 200);
  const prefix = Math.floor(Math.random() * 900 + 100);
  const line = Math.floor(Math.random() * 9000 + 1000);
  return `${areaCode}${prefix}${line}`;
};

async function main() {
  console.log('Clearing existing inquiries...');
  await prisma.inquiry.deleteMany();

  console.log('Seeding inquiries...');

  const inquiryTypeWeights = [
    { item: InquiryType.ESTIMATE, weight: 35 },
    { item: InquiryType.GENERAL, weight: 20 },
    { item: InquiryType.CONTRACTOR, weight: 15 },
    { item: InquiryType.RENOVATION_UPDATE, weight: 10 },
    { item: InquiryType.JOB_APPLICATION, weight: 10 },
    { item: InquiryType.BILLING, weight: 10 },
  ];

  const statusWeights = [
    { item: InquiryStatus.NEW, weight: 50 },
    { item: InquiryStatus.CONTACTED, weight: 30 },
    { item: InquiryStatus.CLOSED, weight: 20 },
  ];

  const inquiries = [];

  for (let i = 0; i < 75; i++) {
    const firstName = getRandom(FIRST_NAMES);
    const lastName = getRandom(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandom(EMAIL_PROVIDERS)}`;
    
    // 15-20% chance of null phone
    const phone = Math.random() > 0.2 ? generateUSPhone() : null;
    
    const createdAt = generateRandomDate(90);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime()));

    inquiries.push({
      name: fullName,
      email: email,
      phone: phone,
      inquiry: getWeightedItem(inquiryTypeWeights),
      message: getRandom(MESSAGES),
      status: getWeightedItem(statusWeights),
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
  }

  await prisma.inquiry.createMany({
    data: inquiries,
  });

  console.log(`Successfully created ${inquiries.length} inquiries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
