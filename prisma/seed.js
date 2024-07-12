import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.lessonPlanFeature.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.lessonPlan.deleteMany();

  const featuresData = [
    { name: 'Customer support', planTypes: ['free', 'standard', 'pro'] },
    { name: 'Access to selected courses', planTypes: ['free', 'standard', 'pro'] },
    { name: 'Access to all courses', planTypes: ['standard', 'pro'] },
    { name: 'Monthly progress reports', planTypes: ['standard', 'pro'] },
    { name: 'Community forum access', planTypes: ['standard', 'pro'] },
    { name: 'Private tutoring sessions', planTypes: ['pro'] },
    { name: 'Personalized learning plans', planTypes: ['pro'] },
    { name: 'Exclusive content and resources', planTypes: ['pro'] },
    { name: 'Certificate of completion for all courses', planTypes: ['pro'] },
  ];

  const features = [];
  for (const featureData of featuresData) {
    const feature = await prisma.feature.create({
      data: featureData,
    });
    features.push(feature);
  }

  const plans = [
    {
      name: 'CatClass Free Package',
      description: 'Get started with our CatClass Free Package. Perfect for beginners looking to explore our platform.',
      planType: 'free',
      priceId: '',
      endpoint: '/register',
      image: 'images/teacherc.png',
      price: 0,
      features: {
        create: features.filter(feature => feature.planTypes.includes('free')).map(feature => ({
          feature: { connect: { id: feature.id } }
        }))
      }
    },
    {
      name: 'CatClass Standard Package',
      description: 'Enhance your learning experience with the CatClass Standard Package.',
      planType: 'standard',
      priceId: 'price_1Pb6zBHvykoUxbsOxy5MmUXL',
      endpoint: '/create-payment-intent/catclass-standard-package',
      image: 'images/teacherb.png',
      price: 19.99,
      features: {
        create: features.filter(feature => feature.planTypes.includes('standard')).map(feature => ({
          feature: { connect: { id: feature.id } }
        }))
      }
    },
    {
      name: 'CatClass Pro Package',
      description: 'Unlock the full potential of CatClass with the Pro Package.',
      planType: 'pro',
      priceId: 'price_1Pb2wCHvykoUxbsOxKu4WEgM',
      endpoint: '/create-payment-intent/catclass-pro-package',
      image: 'images/teachera.png',
      price: 49.99,
      features: {
        create: features.filter(feature => feature.planTypes.includes('pro')).map(feature => ({
          feature: { connect: { id: feature.id } }
        }))
      }
    },
  ];

  for (const plan of plans) {
    await prisma.lessonPlan.create({
      data: plan,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
