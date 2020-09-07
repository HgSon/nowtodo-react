const db = {
  user1: {
    id: 1212,
    password: 1212,
    todo: {
      test1: {
        id: 1212412,
        complated: false,
        list: {
          test11: { id: 2121, complated: false },
          test12: { id: 12312, complated: true },
          test13: { id: 2256, complated: false },
        },
      },
      test2: {
        id: 456432,
        complated: true,
        list: {
          test21: { id: 1212, complated: true },
          test22: { id: 123535, complated: false },
          test23: { id: 2123, complated: true },
          test24: { id: 1352635, complated: false },
        },
      },
      test3: {
        id: 242325,
        complated: false,
        list: {},
      },
    },
  },
  user2: {
    id: 456456,
    password: 4545,
    todo: {
      new: {
        id: 1231,
        complated: true,
        list: {},
      },
      new2: {
        id: 789789,
        complated: false,
        list: {
          new2_11: { id: 2233, complated: false },
          new2_12: { id: 1245, complated: true },
          new2_13: { id: 21412, complated: true },
        },
      },
      new3: {
        id: 453654,
        complated: false,
        list: {
          new3_1: { id: 2233, complated: false },
          new3_2: { id: 2244, complated: true },
        },
      },
    },
  },
  user3: {
    id: 4534363,
    password: 234234,
    todo: {},
  },
};

export default db;
