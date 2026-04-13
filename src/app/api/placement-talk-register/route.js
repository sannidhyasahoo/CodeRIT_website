import { NextResponse } from 'next/server';
import { connect } from "@/src/dbconfig/dbconfig";
import PlacementTalk from "@/src/models/placementTalkModel";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, usn, email, branch, question } = body;

    if (!name || !usn || !email || !branch) {
      return NextResponse.json(
        { success: false, message: 'All required fields (Name, USN, Email, Branch) must be filled' },
        { status: 400 }
      );
    }

    await connect();

    const existingUser = await PlacementTalk.findOne({
      $or: [{ email: email.toLowerCase() }, { usn: usn.toUpperCase() }]
    });

    if (existingUser) {
      if (existingUser.usn === usn.toUpperCase()) {
        return NextResponse.json(
          { success: false, message: 'This USN is already registered for Placement Talk.' },
          { status: 409 }
        );
      }
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { success: false, message: 'This email is already registered.' },
          { status: 409 }
        );
      }
    }

    const registrationData = {
      name: name.trim(),
      usn: usn.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      branch: branch.trim(),
    };

    if (question && question.trim()) {
      registrationData.question = question.trim();
    }

    const newRegistration = await PlacementTalk.create(registrationData);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! See you at the Placement Talk!',
        data: { id: newRegistration._id, name: newRegistration.name, usn: newRegistration.usn }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Placement Talk Registration error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ success: false, message: errors.join(', ') }, { status: 400 });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ success: false, message: `This ${field} is already registered` }, { status: 409 });
    }

    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
