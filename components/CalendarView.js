import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { getAllPosts } from '@/lib/notion'; // Nobelium 默认博客文章接口
import { queryDatabase } from '@/lib/notion-api'; // 需要封装查询Notion数据库的函数

export default function CalendarView() {
  const [posts, setPosts] = useState([]);
  const [dailyNotes, setDailyNotes] = useState([]);
  const today = dayjs();
  const currentMonth = today.month(); // 当前月份 0-11
  const currentYear = today.year();

  // 获取博客文章
  useEffect(() => {
    getAllPosts({ includePages: false }).then(setPosts);
  }, []);

  // 获取 DailyNotes 短笔记
  useEffect(() => {
    queryDatabase(process.env.NOTION_DAILYNOTES_ID).then(setDailyNotes);
  }, []);

  // 按日期分组博客文章
  const postsByDate = useMemo(() => {
    const map = {};
    posts.forEach(post => {
      const date = dayjs(post.date).format('YYYY-MM-DD');
      if (!map[date]) map[date] = [];
      map[date].push(post);
    });
    return map;
  }, [posts]);

  // 按日期分组 DailyNotes
  const notesByDate = useMemo(() => {
    const map = {};
    dailyNotes.forEach(note => {
      const date = dayjs(note.date).format('YYYY-MM-DD'); // 假设note.date是Notion的date属性
      map[date] = note.text; // 假设note.text是短笔记内容
    });
    return map;
  }, [dailyNotes]);

  // 生成当月日历格子
  const startOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month');
  const endOfMonth = dayjs().year(currentYear).month(currentMonth).endOf('month');
  const daysInMonth = [];
  for (let d = startOfMonth.date(); d <= endOfMonth.date(); d++) {
    const date = startOfMonth.date(d);
    const dateStr = date.format('YYYY-MM-DD');
    daysInMonth.push(
      <div
        key={dateStr}
        className="border p-2 flex flex-col min-h-[80px]"
      >
        <div className="font-bold">{date.date()}</div>
        {/* DailyNotes 短笔记 */}
        {notesByDate[dateStr] && (
          <div className="text-sm text-gray-600">{notesByDate[dateStr]}</div>
        )}
        {/* 当天博客文章 */}
        {postsByDate[dateStr] &&
          postsByDate[dateStr].map(post => (
            <a
              key={post.id}
              href={`/post/${post.slug}`}
              className="text-xs text-blue-500 hover:underline"
            >
              {post.title}
            </a>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
        <div key={d} className="font-bold text-center">{d}</div>
      ))}
      {daysInMonth}
    </div>
  );
}
