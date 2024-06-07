"use client";
import React from "react";
import styles from "./YoutubeWatchtime.module.css";

export default function YoutubeWatchtime() {
  return (
    <section className={styles.YoutubeWatchTime}>
      <p className={styles.title}>Youtube Watch time</p>
      <div className={styles.YoutubeWatchTimeContainer}>
      <div className={styles.YoutubeWatchTimeBody}>
      <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Daily Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amazon</td>
              <td>
                <span className={styles.chart}>
                  <svg
                    width="58"
                    height="20"
                    viewBox="0 0 58 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                      fill="url(#paint0_linear_1402_9646)"
                    />
                    <path
                      d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                      stroke="#5DB48A"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1402_9646"
                        x1="26.4377"
                        y1="-1.16975"
                        x2="26.0323"
                        y2="19.1002"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#49A677" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                1658.00 <span className={styles.upArrow}>↑</span>
              </td>
            </tr>
            <tr>
              <td>Netflix</td>
              <td>
                <span className={styles.chart}>
                  <svg
                    width="58"
                    height="22"
                    viewBox="0 0 58 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.41095 4.66356C8.76231 8.8797 3.19484 13.1769 0.492188 14.7985V19.6633L56.8426 21.6903V14.7985L49.5561 9.22046H42.6598L33.0512 1.31678L19.9513 9.93373L16.6071 4.66356C14.5801 -0.471484 10.0596 0.447415 9.41095 4.66356Z"
                      fill="url(#paint0_linear_1402_9657)"
                    />
                    <path
                      d="M0.492188 14.7982C3.19484 13.1766 8.76231 8.87937 9.41095 4.66323C10.0596 0.447083 14.0328 -0.561613 16.0598 4.57343L19.9513 9.9334L33.1363 1.28186L42.8787 8.93271H49.5561L56.8426 14.7982"
                      stroke="#EB7487"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1402_9657"
                        x1="26.4377"
                        y1="1.42037"
                        x2="26.0323"
                        y2="21.6903"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EB94A2" />
                        <stop
                          offset="1"
                          stop-color="#EB94A2"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                1658.00 <span className={styles.downArrow}>↓</span>
              </td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td>
                <span className={styles.chart}>
                  <svg
                    width="58"
                    height="20"
                    viewBox="0 0 58 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                      fill="url(#paint0_linear_1402_9646)"
                    />
                    <path
                      d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                      stroke="#5DB48A"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1402_9646"
                        x1="26.4377"
                        y1="-1.16975"
                        x2="26.0323"
                        y2="19.1002"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#49A677" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                1658.00 <span className={styles.upArrow}>↑</span>
              </td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td>
                <span className={styles.chart}>
                  <svg
                    width="58"
                    height="20"
                    viewBox="0 0 58 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                      fill="url(#paint0_linear_1402_9646)"
                    />
                    <path
                      d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                      stroke="#5DB48A"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1402_9646"
                        x1="26.4377"
                        y1="-1.16975"
                        x2="26.0323"
                        y2="19.1002"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#49A677" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                1658.00 <span className={styles.upArrow}>↑</span>
              </td>
            </tr>
            <tr>
              <td>Netflix</td>
              <td>
                <span className={styles.chart}>
                  <svg
                    width="58"
                    height="22"
                    viewBox="0 0 58 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.41095 4.66356C8.76231 8.8797 3.19484 13.1769 0.492188 14.7985V19.6633L56.8426 21.6903V14.7985L49.5561 9.22046H42.6598L33.0512 1.31678L19.9513 9.93373L16.6071 4.66356C14.5801 -0.471484 10.0596 0.447415 9.41095 4.66356Z"
                      fill="url(#paint0_linear_1402_9657)"
                    />
                    <path
                      d="M0.492188 14.7982C3.19484 13.1766 8.76231 8.87937 9.41095 4.66323C10.0596 0.447083 14.0328 -0.561613 16.0598 4.57343L19.9513 9.9334L33.1363 1.28186L42.8787 8.93271H49.5561L56.8426 14.7982"
                      stroke="#EB7487"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1402_9657"
                        x1="26.4377"
                        y1="1.42037"
                        x2="26.0323"
                        y2="21.6903"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EB94A2" />
                        <stop
                          offset="1"
                          stop-color="#EB94A2"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                1658.00 <span className={styles.downArrow}>↓</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
}
