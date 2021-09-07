import { describe, test, expect, jest } from '@jest/globals';
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js';
import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

  describe('#getFileStatus', () => {
    test('it should return statuses in correct format', async () => {
      const statMock = {
        dev: 3870185642,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 4222124650692339,      
        size: 478654,
        blocks: 936,
        atimeMs: 1631019648026.7795,
        mtimeMs: 1622079780000,     
        ctimeMs: 1622069944627.0347,
        birthtimeMs: 1631018729975.1406,
        atime: '2021-09-07T13:00:48.027Z',
        mtime: '2021-05-27T01:43:00.000Z',
        ctime: '2021-05-26T22:59:04.627Z',
        birthtime: '2021-09-07T12:45:29.975Z'
      }

      const mockUser = 'igor'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])
      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus("/tmp")

      const expectedResult = [
        {
          size: "479 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})