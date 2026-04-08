'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v7 as uuidv7 } from 'uuid';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';

// Models
import Login from '../models/restaurant/loginModel.js';
import MainBranch from '../models/restaurant/mainBranch.js';
import Category from '../models/restaurant/categoryModel.js';
import Menu from '../models/restaurant/menuSchema.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('Seeding data...');

    // 1. Create a sample Main Branch first (to get a referenceId)
    const existingBranch = await MainBranch.findOne({ branchId: 'seed-branch-1' });
    let branchId = 'seed-branch-1';

    if (!existingBranch) {
      const newBranch = new MainBranch({
        branchId: 'seed-branch-1',
        name: 'Crevings Signature Restaurant',
        cuisineType: 'Multi-Cuisine',
        contact: {
          email: 'signature@crevings.com',
          phone: '1234567890'
        },
        address: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          postalCode: '400001',
          coordinates: [72.8777, 19.0760]
        }
      });
      await newBranch.save();
      console.log('Branch seeded');
    }

    // 2. Seed Admin User
    const adminEmail = 'chintan';
    const adminPassword = 'adminPassword123'; // User should change this
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await Login.deleteMany({ emailId: adminEmail });
    const adminLogin = new Login({
      emailId: adminEmail,
      passwordHash: passwordHash,
      role: 'SUPER_ADMIN',
      referenceId: 'SYSTEM_ADMIN' // Use a system ID or branch ID
    });
    await adminLogin.save();
    console.log(`Admin user seeded: ${adminEmail} / ${adminPassword}`);

    // 3. Seed some categories
    const categories = ['Main Course', 'Starters', 'Beverages', 'Desserts'];
    for (const catName of categories) {
      const existingCat = await Category.findOne({ name: catName, branchId });
      if (!existingCat) {
        const cat = new Category({
          categoryId: uuidv7(),
          branchId,
          name: catName,
          description: `Delicious ${catName}`,
          isActive: true
        });
        await cat.save();
      }
    }
    console.log('Categories seeded');

    // 4. Seed some menu items
    const sampleCategory = await Category.findOne({ name: 'Main Course', branchId });
    if (sampleCategory) {
      const existingMenu = await Menu.findOne({ name: 'Butter Chicken', branchId });
      if (!existingMenu) {
        const menuItem = new Menu({
            menuId: uuidv7(),
            branchId,
            name: 'Butter Chicken',
            description: 'Classic creamy tomato based chicken curry',
            price: 450,
            categoryId: sampleCategory.categoryId,
            isVeg: false,
            availabilityStatus: 'available'
        });
        await menuItem.save();
        console.log('Menu items seeded');
      }
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
