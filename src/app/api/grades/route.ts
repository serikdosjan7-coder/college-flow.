import { NextRequest, NextResponse } from 'next/server';
import { studentGrades } from '@/lib/mockData';

// GET all grades
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: studentGrades,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}

// POST update grades
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subjectId, newGrade, userId } = body;
    
    console.log('📝 Grade update request:', { subjectId, newGrade, userId });
    
    // In a real app, this would update the database
    // For now, we'll simulate the update
    if (subjectId >= 0 && subjectId < studentGrades.length && newGrade >= 1 && newGrade <= 5) {
      studentGrades[subjectId].grades.push(newGrade);
      
      // Recalculate average
      const grades = studentGrades[subjectId].grades;
      studentGrades[subjectId].average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      
      return NextResponse.json({
        success: true,
        message: 'Grade updated successfully',
        data: studentGrades[subjectId],
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid grade data' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update grade' },
      { status: 500 }
    );
  }
}