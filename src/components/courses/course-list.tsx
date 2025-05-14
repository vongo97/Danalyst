import React from 'react';

export function CourseList({ courses }: { courses: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          <h2 className="font-bold text-lg mb-2">{course.title}</h2>
          <p className="mb-2">{course.description}</p>
        </div>
      ))}
    </div>
  );
} 