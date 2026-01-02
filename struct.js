// Mock data for demonstration purposes
const mockResults = {
    '12345': {
        name: 'Rajesh Kumar',
        course: 'Diploma in Computer Engineering',
        semester: 'Semester III',
        examType: 'Regular',
        subjects: [
            { code: '22317', name: 'Object Oriented Programming', marks: 85, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22318', name: 'Data Structure', marks: 78, maxMarks: 100, grade: 'AB', status: 'PASS' },
            { code: '22319', name: 'Database Management System', marks: 82, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22320', name: 'Web Development', marks: 88, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22321', name: 'Software Engineering', marks: 75, maxMarks: 100, grade: 'BB', status: 'PASS' }
        ]
    },
    '67890': {
        name: 'Priya Sharma',
        course: 'Diploma in Electronics Engineering',
        semester: 'Semester IV',
        examType: 'Regular',
        subjects: [
            { code: '22415', name: 'Microcontrollers', marks: 92, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22416', name: 'Digital Electronics', marks: 88, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22417', name: 'Communication Systems', marks: 80, maxMarks: 100, grade: 'AA', status: 'PASS' },
            { code: '22418', name: 'Control Systems', marks: 76, maxMarks: 100, grade: 'AB', status: 'PASS' },
            { code: '22419', name: 'Power Electronics', marks: 84, maxMarks: 100, grade: 'AA', status: 'PASS' }
        ]
    },
    '11111': {
        name: 'Amit Patel',
        course: 'Diploma in Mechanical Engineering',
        semester: 'Semester V',
        examType: 'ATKT',
        subjects: [
            { code: '22520', name: 'Thermodynamics', marks: 45, maxMarks: 100, grade: 'DD', status: 'PASS' },
            { code: '22521', name: 'Machine Design', marks: 38, maxMarks: 100, grade: 'FF', status: 'FAIL' },
            { code: '22522', name: 'Manufacturing Processes', marks: 52, maxMarks: 100, grade: 'CC', status: 'PASS' },
            { code: '22523', name: 'Fluid Mechanics', marks: 48, maxMarks: 100, grade: 'DD', status: 'PASS' },
            { code: '22524', name: 'CAD/CAM', marks: 55, maxMarks: 100, grade: 'CC', status: 'PASS' }
        ]
    }
};

// Grade mapping
const gradePoints = {
    'AA': 10, 'AB': 9, 'BB': 8, 'BC': 7, 'CC': 6, 'CD': 5, 'DD': 4, 'FF': 0
};

document.getElementById('resultForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const seatNumber = document.getElementById('seatNumber').value.trim();
    const examType = document.getElementById('examType').value;
    const semester = document.getElementById('semester').value;
    const examSession = document.getElementById('examSession').value;
    
    // Hide previous results and errors
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    
    // Validate inputs
    if (!seatNumber || !examType || !semester || !examSession) {
        showError('Please fill in all fields.');
        return;
    }
    
    // Check if result exists in mock data
    if (mockResults[seatNumber]) {
        displayResult(mockResults[seatNumber], seatNumber, examType, semester);
    } else {
        // Generate a random result for demonstration
        const randomResult = generateRandomResult(seatNumber, examType, semester);
        displayResult(randomResult, seatNumber, examType, semester);
    }
});

function displayResult(resultData, seatNumber, examType, semester) {
    // Update student information
    document.getElementById('resultSeatNumber').textContent = seatNumber;
    document.getElementById('resultStudentName').textContent = resultData.name;
    document.getElementById('resultCourse').textContent = resultData.course;
    document.getElementById('resultSemester').textContent = resultData.semester;
    document.getElementById('resultExamType').textContent = resultData.examType;
    
    // Populate marks table
    const tableBody = document.getElementById('marksTableBody');
    tableBody.innerHTML = '';
    
    let totalMarks = 0;
    let totalMaxMarks = 0;
    let hasFail = false;
    
    resultData.subjects.forEach(subject => {
        const row = document.createElement('tr');
        totalMarks += subject.marks;
        totalMaxMarks += subject.maxMarks;
        if (subject.status === 'FAIL') hasFail = true;
        
        row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.marks}</td>
            <td>${subject.maxMarks}</td>
            <td class="grade">${subject.grade}</td>
            <td class="status-${subject.status.toLowerCase()}">${subject.status}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Calculate percentage
    const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
    
    // Update summary
    document.getElementById('totalMarks').textContent = `${totalMarks} / ${totalMaxMarks}`;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    // Update result status
    const resultStatus = document.getElementById('resultStatus');
    if (hasFail || percentage < 40) {
        resultStatus.textContent = 'FAIL';
        resultStatus.className = 'summary-value result-status fail';
    } else {
        resultStatus.textContent = 'PASS';
        resultStatus.className = 'summary-value result-status pass';
    }
    
    // Show result container
    document.getElementById('resultContainer').classList.remove('hidden');
    
    // Scroll to result
    document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateRandomResult(seatNumber, examType, semester) {
    const names = ['Rahul Verma', 'Sneha Desai', 'Vikram Singh', 'Anjali Mehta', 'Karan Joshi'];
    const courses = [
        'Diploma in Computer Engineering',
        'Diploma in Electronics Engineering',
        'Diploma in Mechanical Engineering',
        'Diploma in Civil Engineering',
        'Diploma in Electrical Engineering'
    ];
    
    const subjectTemplates = {
        '1': [
            { code: '22001', name: 'Applied Mathematics' },
            { code: '22002', name: 'Applied Physics' },
            { code: '22003', name: 'Applied Chemistry' },
            { code: '22004', name: 'Communication Skills' },
            { code: '22005', name: 'Engineering Drawing' }
        ],
        '2': [
            { code: '22106', name: 'Programming in C' },
            { code: '22107', name: 'Basic Electronics' },
            { code: '22108', name: 'Engineering Mathematics' },
            { code: '22109', name: 'Workshop Practice' },
            { code: '22110', name: 'Environmental Studies' }
        ],
        '3': [
            { code: '22317', name: 'Object Oriented Programming' },
            { code: '22318', name: 'Data Structure' },
            { code: '22319', name: 'Database Management System' },
            { code: '22320', name: 'Web Development' },
            { code: '22321', name: 'Software Engineering' }
        ],
        '4': [
            { code: '22415', name: 'Java Programming' },
            { code: '22416', name: 'Computer Networks' },
            { code: '22417', name: 'Operating Systems' },
            { code: '22418', name: 'Mobile Application Development' },
            { code: '22419', name: 'Project Management' }
        ],
        '5': [
            { code: '22520', name: 'Advanced Web Technologies' },
            { code: '22521', name: 'Cloud Computing' },
            { code: '22522', name: 'Information Security' },
            { code: '22523', name: 'Internet of Things' },
            { code: '22524', name: 'Project Work' }
        ],
        '6': [
            { code: '22625', name: 'Machine Learning' },
            { code: '22626', name: 'Big Data Analytics' },
            { code: '22627', name: 'Industrial Training' },
            { code: '22628', name: 'Project Implementation' },
            { code: '22629', name: 'Professional Practices' }
        ]
    };
    
    const subjects = subjectTemplates[semester] || subjectTemplates['3'];
    const name = names[Math.floor(Math.random() * names.length)];
    const course = courses[Math.floor(Math.random() * courses.length)];
    
    const resultSubjects = subjects.map(subject => {
        const marks = Math.floor(Math.random() * 60) + 40; // Random marks between 40-100
        const grade = getGrade(marks);
        const status = marks >= 40 ? 'PASS' : 'FAIL';
        
        return {
            code: subject.code,
            name: subject.name,
            marks: marks,
            maxMarks: 100,
            grade: grade,
            status: status
        };
    });
    
    return {
        name: name,
        course: course,
        semester: `Semester ${semester}`,
        examType: examType.charAt(0).toUpperCase() + examType.slice(1),
        subjects: resultSubjects
    };
}

function getGrade(marks) {
    if (marks >= 90) return 'AA';
    if (marks >= 80) return 'AB';
    if (marks >= 70) return 'BB';
    if (marks >= 60) return 'BC';
    if (marks >= 50) return 'CC';
    if (marks >= 45) return 'CD';
    if (marks >= 40) return 'DD';
    return 'FF';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

