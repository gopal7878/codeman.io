import { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const roadmaps = {
  AWS: [
    { title: "Cloud Fundamentals", video: "https://youtu.be/AWS1", content: "https://aws.amazon.com/what-is-cloud-computing/" },
    { title: "IAM & Security", video: "https://youtu.be/AWS2", content: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html" },
    { title: "EC2 & S3", video: "https://youtu.be/AWS3", content: "https://docs.aws.amazon.com/ec2/index.html" },
    { title: "VPC & Networking", video: "https://youtu.be/AWS4", content: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" },
    { title: "DevOps on AWS", video: "https://youtu.be/AWS5", content: "https://aws.amazon.com/devops/" }
  ],
  Backend: [
    { title: "Intro to Servers", video: "https://youtu.be/xyz1", content: "https://www.geeksforgeeks.org/basics-computer-networking/" },
    { title: "Learn Node.js", video: "https://youtu.be/xyz2", content: "https://nodejs.org/en/docs" },
    { title: "Database Basics", video: "https://youtu.be/xyz3", content: "https://www.postgresqltutorial.com/" },
    { title: "REST & GraphQL", video: "https://youtu.be/xyz4", content: "https://graphql.org/learn/" },
    { title: "Auth Systems", video: "https://youtu.be/xyz5", content: "https://developer.okta.com/docs/concepts/authentication/" }
  ],
  Frontend: [
    { title: "HTML & CSS", video: "https://youtu.be/fed1", content: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
    { title: "JavaScript", video: "https://youtu.be/fed2", content: "https://javascript.info/" },
    { title: "React Basics", video: "https://youtu.be/fed3", content: "https://reactjs.org/docs/getting-started.html" },
    { title: "State Management", video: "https://youtu.be/fed4", content: "https://redux.js.org/introduction/getting-started" },
    { title: "Testing", video: "https://youtu.be/fed5", content: "https://jestjs.io/docs/getting-started" }
  ],
  "Data Analyst": [
    { title: "Excel Tips", video: "https://youtu.be/da1", content: "https://support.microsoft.com/en-us/excel" },
    { title: "SQL Queries", video: "https://youtu.be/da2", content: "https://sqlzoo.net/" },
    { title: "Python for Analysis", video: "https://youtu.be/da3", content: "https://pandas.pydata.org/docs/" },
    { title: "Data Viz", video: "https://youtu.be/da4", content: "https://www.tableau.com/learn/training" },
    { title: "Probability", video: "https://youtu.be/da5", content: "https://www.khanacademy.org/math/statistics-probability" }
  ],
  DevOps: [
    { title: "Linux CLI", video: "https://youtu.be/dev1", content: "https://linuxjourney.com/" },
    { title: "Git", video: "https://youtu.be/dev2", content: "https://git-scm.com/doc" },
    { title: "CI/CD", video: "https://youtu.be/dev3", content: "https://docs.github.com/en/actions" },
    { title: "Docker", video: "https://youtu.be/dev4", content: "https://docs.docker.com/get-started/" },
    { title: "Kubernetes", video: "https://youtu.be/dev5", content: "https://kubernetes.io/docs/home/" }
  ],
  AI: [
    { title: "Python & NumPy", video: "https://youtu.be/ai1", content: "https://numpy.org/doc/" },
    { title: "ML Basics", video: "https://youtu.be/ai2", content: "https://scikit-learn.org/stable/tutorial/basic/tutorial.html" },
    { title: "Deep Learning", video: "https://youtu.be/ai3", content: "https://www.tensorflow.org/tutorials" },
    { title: "NLP", video: "https://youtu.be/ai4", content: "https://www.nltk.org/book/" },
    { title: "AI Ethics", video: "https://youtu.be/ai5", content: "https://aiethics.princeton.edu/" }
  ]
};

export default function Codeman() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [progress, setProgress] = useState({});

  const handleRegister = () => {
    if (email.includes("@")) {
      setRegistered(true);
    }
  };

  const toggleChapterCompletion = (track, index) => {
    const key = `${track}-${index}`;
    setProgress((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        completed: !prev[key]?.completed,
        quizScore: prev[key]?.quizScore || 0,
      },
    }));
  };

  const handleQuizScore = (track, index, score) => {
    const key = `${track}-${index}`;
    setProgress((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        quizScore: score,
      },
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        codeman.io
      </motion.h1>

      <motion.p
        className="text-center mb-4 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Choose your learning path
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(roadmaps).map((track, index) => (
          <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="all" scale={1.05} key={track}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button onClick={() => setSelectedTrack(track)}>{track}</Button>
            </motion.div>
          </Tilt>
        ))}
      </div>

      {selectedTrack && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="mb-6 shadow-xl">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">{selectedTrack} Roadmap</h2>
              <ul className="list-disc pl-6">
                {roadmaps[selectedTrack].map((chapter, idx) => {
                  const chapterProgress = progress[`${selectedTrack}-${idx}`] || {};
                  const completed = chapterProgress.completed;
                  const isExclusive = idx > 3 && !registered;
                  return (
                    <motion.li
                      key={idx}
                      className="mb-4"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="flex flex-col gap-2">
                        <span className={isExclusive ? "text-gray-400 italic" : ""}>
                          {isExclusive ? "Exclusive - " : ""}{chapter.title}
                        </span>
                        {!isExclusive && (
                          <div className="flex flex-wrap gap-2 items-center">
                            <a
                              href={chapter.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Watch Video
                            </a>
                            {chapter.content && (
                              <a
                                href={chapter.content}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 underline"
                              >
                                Read Article
                              </a>
                            )}
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={completed || false}
                                onChange={() => toggleChapterCompletion(selectedTrack, idx)}
                              />
                              <span>Done</span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              className="border rounded px-2 py-1 w-20 text-sm"
                              placeholder="Quiz %"
                              value={chapterProgress.quizScore || ""}
                              onChange={(e) => handleQuizScore(selectedTrack, idx, parseInt(e.target.value) || 0)}
                            />
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
              <Progress
                value={
                  (Object.entries(progress).filter(
                    ([key, val]) => key.startsWith(selectedTrack) && val.completed
                  ).length /
                    roadmaps[selectedTrack].length) *
                  100
                }
                className="mt-4"
              />
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Register for Exclusive Content</h2>
        <div className="flex gap-2 items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleRegister}>Register</Button>
        </div>
        {registered && <p className="text-green-600 mt-2">Thank you! Exclusive content is now unlocked.</p>}
      </div>
    </div>
  );
}
