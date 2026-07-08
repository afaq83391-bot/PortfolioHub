require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const user = await User.create({
      name: 'Alex Morgan',
      email: 'alex@portfolio.dev',
      password: 'demo1234',
      bio: 'Full-stack developer passionate about building beautiful, performant web applications. Specializing in React, Node.js, and cloud architecture.',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
    });
    console.log(`Created user: ${user.email}`);

    // Create sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with product catalog, shopping cart, Stripe payment integration, order management, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Tailwind CSS'],
        category: 'web-app',
        githubUrl: 'https://github.com/alexmorgan/ecommerce',
        liveUrl: 'https://ecommerce-demo.alexmorgan.dev',
        imageUrl: 'https://picsum.photos/seed/ecom42/600/400',
        status: 'completed',
        featured: true,
        user: user._id,
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop kanban boards, and team workspaces.',
        technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Vite'],
        category: 'web-app',
        githubUrl: 'https://github.com/alexmorgan/taskapp',
        liveUrl: 'https://tasks-demo.alexmorgan.dev',
        imageUrl: 'https://picsum.photos/seed/task77/600/400',
        status: 'completed',
        featured: true,
        user: user._id,
      },
      {
        title: 'Fitness Tracker',
        description: 'A cross-platform fitness tracking mobile application with workout logging, progress charts, and meal planning.',
        technologies: ['React Native', 'Express', 'MongoDB', 'Chart.js', 'Expo'],
        category: 'mobile-app',
        githubUrl: 'https://github.com/alexmorgan/fitness',
        liveUrl: '',
        imageUrl: 'https://picsum.photos/seed/fit99/600/400',
        status: 'in-progress',
        featured: false,
        user: user._id,
      },
      {
        title: 'Weather Dashboard',
        description: 'An elegant weather dashboard with 7-day forecasts, interactive maps, air quality index, and location-based alerts.',
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'Framer Motion'],
        category: 'web-app',
        githubUrl: 'https://github.com/alexmorgan/weather',
        liveUrl: 'https://weather-demo.alexmorgan.dev',
        imageUrl: 'https://picsum.photos/seed/weath55/600/400',
        status: 'completed',
        featured: false,
        user: user._id,
      },
      {
        title: 'REST API Boilerplate',
        description: 'A production-ready REST API starter template with JWT auth, rate limiting, validation, and Docker support.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Docker'],
        category: 'api',
        githubUrl: 'https://github.com/alexmorgan/api-boilerplate',
        liveUrl: '',
        imageUrl: 'https://picsum.photos/seed/api33/600/400',
        status: 'completed',
        featured: true,
        user: user._id,
      },
      {
        title: 'Portfolio Generator',
        description: 'A static site generator for developer portfolios with markdown content, custom themes, and one-click deployment.',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'MDX', 'Vercel'],
        category: 'web-app',
        githubUrl: 'https://github.com/alexmorgan/portgen',
        liveUrl: '',
        imageUrl: 'https://picsum.photos/seed/port88/600/400',
        status: 'in-progress',
        featured: false,
        user: user._id,
      },
      {
        title: 'Real-Time Chat App',
        description: 'A scalable real-time chat application with private messages, group channels, file sharing, and read receipts.',
        technologies: ['React', 'Socket.io', 'Node.js', 'Redis', 'PostgreSQL'],
        category: 'web-app',
        githubUrl: '',
        liveUrl: '',
        imageUrl: 'https://picsum.photos/seed/chat22/600/400',
        status: 'planned',
        featured: false,
        user: user._id,
      },
      {
        title: 'Design System',
        description: 'A comprehensive design system with 50+ accessible components, theme customization, and full Storybook docs.',
        technologies: ['React', 'Storybook', 'CSS Variables', 'Testing Library', 'Rollup'],
        category: 'library',
        githubUrl: 'https://github.com/alexmorgan/design-sys',
        liveUrl: 'https://design-sys.alexmorgan.dev',
        imageUrl: 'https://picsum.photos/seed/dsn44/600/400',
        status: 'completed',
        featured: false,
        user: user._id,
      },
      {
        title: 'AI Image Classifier',
        description: 'A desktop application for image classification using transfer learning with custom model training support.',
        technologies: ['Python', 'TensorFlow', 'PyQt', 'OpenCV', 'NumPy'],
        category: 'desktop-app',
        githubUrl: 'https://github.com/alexmorgan/ai-classifier',
        liveUrl: '',
        imageUrl: 'https://picsum.photos/seed/aicl66/600/400',
        status: 'in-progress',
        featured: false,
        user: user._id,
      },
      {
        title: 'Recipe Finder',
        description: 'A recipe discovery platform with ingredient-based search, nutritional info, and shopping list generation.',
        technologies: ['React', 'Spoonacular API', 'Redux Toolkit', 'Tailwind CSS'],
        category: 'web-app',
        githubUrl: 'https://github.com/alexmorgan/recipes',
        liveUrl: 'https://recipes-demo.alexmorgan.dev',
        imageUrl: 'https://picsum.photos/seed/food11/600/400',
        status: 'completed',
        featured: false,
        user: user._id,
      },
    ];

    await Project.insertMany(projects);
    console.log(`Created ${projects.length} projects`);

    console.log('\nSeed data created successfully!');
    console.log('Demo credentials: alex@portfolio.dev / demo1234');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();