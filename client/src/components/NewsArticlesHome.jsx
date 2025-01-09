import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventData from "../data/EventData.json";
import newsData from "../data/newsData.json";

const NewsArticlesHome = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    setEvents(eventData);
    setNewsArticles(newsData);
  }, []);

  const handleEventClick = (link) => {
    navigate(link);
  };

  const handleEventCardClick = (event) => {
    navigate(`/events/${event.code}`, { state: { event } });
  };

  return (
    <div className="w-full lg:h-[82vh] h-auto flex lg:flex-row flex-col justify-between px-4 lg:px-8 gap-6 py-6 bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Events Section */}
      <div className="lg:h-full lg:w-[70%] h-auto w-full rounded-lg shadow-md bg-white transition-transform duration-300 hover:shadow-lg flex lg:flex-row flex-col gap-6 p-6">
        <div className="lg:w-1/2 w-full lg:h-full h-auto flex flex-col justify-between">
          <h1 className="w-full h-auto py-2 px-4 rounded-md text-white bg-blue-950 font-semibold text-2xl text-start mb-4">
            Events
          </h1>
          <div className="w-full flex-grow">
            <img
              src={eventData[0].eventImages[0]}
              alt="1st Event's image"
              className="mb-4 rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold text-[#1A202C] mb-2">
              {eventData[0].heading}
            </h3>
            <p className="text-gray-600 text-sm">{eventData[0].description}</p>
          </div>
          <button
            onClick={() => handleEventClick("/events")}
            className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-[#19194D] transition-all duration-300 mt-4 self-end"
          >
            View All Events
          </button>
        </div>
        <div className="lg:w-1/2 w-full lg:h-full h-auto flex flex-col justify-between gap-4">
          {eventData.slice(1, 4).map((event, index) => (
            <div
              key={index}
              className="w-full h-32 border border-gray-200 rounded-lg shadow-sm overflow-hidden flex lg:flex-row-reverse flex-col items-center bg-white transform transition-transform duration-300 hover:shadow-md cursor-pointer"
              onClick={() => handleEventCardClick(event)}
            >
              <img
                src={event.eventImages[0]}
                alt={event.heading}
                className="lg:w-1/2 w-full h-32 object-cover"
              />
              <div className="lg:w-1/2 w-full h-full flex flex-col justify-center px-4 py-2">
                <h4 className="text-lg font-bold text-[#1A202C]">
                  {event.heading}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="lg:h-full lg:w-[30%] h-auto w-full rounded-lg shadow-md bg-white transition-transform duration-300 hover:shadow-lg p-6">
        <div className="w-full h-12 flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-2xl font-semibold text-[#1A202C]">News</h3>
          <button
            onClick={() => handleEventClick("/news")}
            className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-[#19194D] transition-all duration-300"
          >
            View All
          </button>
        </div>

        {/* News Articles Container */}
        <div className="w-full h-[calc(100%-4rem)] lg:overflow-y-auto">
          <div className="flex flex-col">
            {newsArticles.slice(0, 4).map((article, index) => (
              <div
                key={index}
                className="w-full h-auto p-4 my-2 border border-gray-200 rounded-lg shadow-sm bg-white transform transition-transform duration-300 hover:shadow-md cursor-pointer animate-fade-in"
              >
                <div className="w-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-[#1A202C]">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          article.content.slice(
                            0,
                            Math.min(article.content.length, 120)
                          ) + "...",
                      }}
                    />
                  </p>
                </div>
              </div>
            ))}
            {/* Additional articles for larger screens */}
            <div className="lg:block hidden">
              {newsArticles.slice(4).map((article, index) => (
                <div
                  key={index + 4}
                  className="w-full h-auto p-4 my-2 border border-gray-200 rounded-lg shadow-sm bg-white transform transition-transform duration-300 hover:shadow-md cursor-pointer animate-fade-in"
                >
                  <div className="w-full flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-[#1A202C]">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            article.content.slice(
                              0,
                              Math.min(article.content.length, 120)
                            ) + "...",
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for the fade-in animation */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default NewsArticlesHome;