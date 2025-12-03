import { useState, useEffect } from 'react';
import { getAllPosts } from '@/lib/notion';
import BlogPost from '@/components/BlogPost';

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [postsByDate, setPostsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getAllPosts({ includePages: false });
      const filtered = allPosts.filter(post => {
        const postDate = new Date(post.date || post.createdTime);
        return postDate.getFullYear() === date.getFullYear() &&
               postDate.getMonth() === date.getMonth();
      });

      const grouped = {};
      filtered.forEach(post => {
        const postDate = new Date(post.date || post.createdTime);
        const key = postDate.toISOString().split('T')[0];
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(post);
      });
      setPostsByDate(grouped);
    }

    fetchPosts();
  }, [date]);

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(date.getFullYear(), date.getMonth());
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const key = dayDate.toISOString().split('T')[0];
      const hasPost = postsByDate[key]?.length > 0;

      days.push(
        <div
          key={i}
          className={`border p-2 text-center cursor-pointer ${hasPost ? 'bg-yellow-100' : ''}`}
          onClick={() => setSelectedDate(key)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + offset, 1);
    setDate(newDate);
    setSelectedDate(null); // 切换月份时取消选择
  };

  return (
    <div className="calendar border p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => changeMonth(-1)} className="px-2 py-1 bg-gray-200 rounded">Prev</button>
        <h2 className="text-xl font-bold">{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)} className="px-2 py-1 bg-gray-200 rounded">Next</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        <div className="font-semibold text-center">Sun</div>
        <div className="font-semibold text-center">Mon</div>
        <div className="font-semibold text-center">Tue</div>
        <div className="font-semibold text-center">Wed</div>
        <div className="font-semibold text-center">Thu</div>
        <div className="font-semibold text-center">Fri</div>
        <div className="font-semibold text-center">Sat</div>
        {renderDays()}
      </div>

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Posts on {selectedDate}</h3>
          {postsByDate[selectedDate]?.map(post => (
            <BlogPost key={post.id} post={post} />
          )) || <p>No posts on this day.</p>}
        </div>
      )}
    </div>
  );
}
