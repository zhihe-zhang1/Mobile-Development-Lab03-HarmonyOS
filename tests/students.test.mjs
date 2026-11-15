import assert from 'node:assert/strict'
import test from 'node:test'
import {
  filterStudentsByName,
  findStudentById,
  getStudentDetailUrl,
  loadStudents
} from '../services/students.mjs'

test('加载通过定时器延迟完成，记录包含三个要求字段，且学号唯一', async () => {
  let resolved = false
  const pending = loadStudents(10).then((students) => {
    resolved = true
    return students
  })
  await Promise.resolve()
  assert.equal(resolved, false)
  const students = await pending
  assert.ok(students.length > 1)
  assert.equal(new Set(students.map(({ id }) => id)).size, students.length)
  for (const student of students) {
    assert.ok(student.id && student.name && student.major)
  }
})

test('仅按姓名做子串过滤，忽略首尾空格', async () => {
  const students = await loadStudents(0)
  const matched = filterStudentsByName(students, '  林  ')
  assert.deepEqual(matched.map(({ name }) => name), ['林予安', '林思齐'])
  assert.deepEqual(filterStudentsByName(students, '人工智能'), [])
  assert.deepEqual(filterStudentsByName(students, '不存在的姓名'), [])
  assert.deepEqual(filterStudentsByName(students, '   '), students)
})

test('用字符串学号查详情，保留前导零，未知学号返回空', async () => {
  assert.equal(findStudentById('026001').name, '林予安')
  assert.equal(findStudentById('26001'), null)
  assert.equal(findStudentById(undefined), null)
  const students = await loadStudents(0)
  students[0].name = '测试修改'
  assert.equal(findStudentById('026001').name, '林予安')
})

test('导航地址携带经过 URI 编码的学号', () => {
  assert.equal(
    getStudentDetailUrl('026001'),
    '/pages/student-detail/student-detail?id=026001'
  )
  assert.equal(
    getStudentDetailUrl('A/B &'),
    '/pages/student-detail/student-detail?id=A%2FB%20%26'
  )
})
