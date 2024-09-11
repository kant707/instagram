export const fetchStories = async () => {
  return [
    {
      userId: 1,
      profilePic: "/profiles/pic1.jpg",
      stories: [
        "/stories/story1.jpg",
        "/stories/story2.jpg",
        "/stories/story3.jpg",
      ],
    },
    {
      userId: 2,
      profilePic: "/profiles/pic2.jpg",
      stories: ["/stories/story4.jpg", "/stories/story5.jpg"],
    },
    {
      userId: 3,
      profilePic: "/profiles/pic3.jpg",
      stories: ["/stories/story6.jpg"],
    },
  ];
};
