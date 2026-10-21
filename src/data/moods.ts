// EXPORTS: IXMood, MOODS
export interface IXMood {
  id: string;
  name: string;
  verse: string;
  description: string;
  image: string;
}

export const MOODS: IXMood[] = [
  {
    id: 'moon',
    name: '明月与思念',
    verse: '但愿人长久，千里共婵娟。',
    description: '月色是中国人最古老的牵挂。望月的人，心里都住着一个远方。',
    image: 'mood-moon.png',
  },
  {
    id: 'landscape',
    name: '山水与远方',
    verse: '行到水穷处，坐看云起时。',
    description: '山水之间，天地辽阔。远方不在别处，而在每一次抬头的风景。',
    image: 'mood-landscape.png',
  },
  {
    id: 'spring',
    name: '春日与流年',
    verse: '无可奈何花落去，似曾相识燕归来。',
    description: '春天年年回来，人也年年不同。惜春，其实是惜自己。',
    image: 'mood-spring.png',
  },
  {
    id: 'autumn',
    name: '秋意与孤寂',
    verse: '无边落木萧萧下，不尽长江滚滚来。',
    description: '秋天把热烈收走，把心事还给一个人。孤寂里，常有最深的清醒。',
    image: 'mood-autumn.png',
  },
  {
    id: 'grand',
    name: '壮阔与豪情',
    verse: '会当凌绝顶，一览众山小。',
    description: '大江大河，长风浩荡。人在天地之间，也可豪情万丈。',
    image: 'mood-grand.png',
  },
];

export const getMood = (id: string) => MOODS.find((m) => m.id === id);
