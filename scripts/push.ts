// This script is used to push schema changes to the database
import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Applying database schema changes...')
    
    // Add your migrations or schema modifications here if needed
    
    console.log('Schema updated successfully!')
  } catch (error) {
    console.error('Error updating schema:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
