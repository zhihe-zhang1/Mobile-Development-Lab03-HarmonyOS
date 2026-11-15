const STUDENTS = [
  { id: '026001', name: '林予安', major: '软件工程', grade: '2026 级', color: 'blue' },
  { id: '026002', name: '陈书言', major: '计算机科学与技术', grade: '2026 级', color: 'mint' },
  { id: '026003', name: '周星禾', major: '数字媒体技术', grade: '2026 级', color: 'amber' },
  { id: '026004', name: '许知远', major: '人工智能', grade: '2026 级', color: 'purple' },
  { id: '026005', name: '林思齐', major: '数据科学与大数据技术', grade: '2026 级', color: 'blue' },
  { id: '026006', name: '沈嘉宁', major: '网络工程', grade: '2026 级', color: 'mint' }
]

export const DEFAULT_LOAD_DELAY_MS = 1000

export function loadStudents(delayMs = DEFAULT_LOAD_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STUDENTS.map((student) => ({ ...student })))
    }, delayMs)
  })
}

export function filterStudentsByName(students, keyword) {
  const term = keyword.trim().toLowerCase()
  return term
    ? students.filter(({ name }) => name.toLowerCase().includes(term))
    : students
}

export function findStudentById(id) {
  const student = STUDENTS.find((record) => record.id === id)
  return student ? { ...student } : null
}

export function getStudentDetailUrl(id) {
  return '/pages/student-detail/student-detail?id=' + encodeURIComponent(id)
}
