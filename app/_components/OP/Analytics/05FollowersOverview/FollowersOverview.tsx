"use client";
import React from "react";
import styles from "./FollowersOverview.module.css";

export default function FollowersOverview() {
  return (
    <section className={styles.FollowersOverview}>
      <p className={styles.FollowersOverviewTitle}>Followers Overview</p>
      <div className={styles.FollowersOverviewContainer}>
        <div className={styles.FollowersOverviewBody}>
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Followers</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PST Canada</td>
              <td>200 K</td>
              <td className={styles.percentage}>
                <span>30 %</span> <span className={styles.up}>▲</span>
              </td>
            </tr>
            <tr>
              <td>PST USA</td>
              <td>200 K</td>
              <td className={styles.percentage}>
                <span>26%</span> <span className={styles.down}>▼</span>
              </td>
            </tr>
            <tr>
              <td>ST Suite</td>
              <td>200 K</td>
              <td className={styles.percentage}>
                <span>14%</span> <span className={styles.up}>▲</span>
              </td>
            </tr>
            <tr>
              <td>Juice Box</td>
              <td>200 K</td>
              <td className={styles.percentage}>
                <span>3.5%</span> <span className={styles.up}>▲</span>
              </td>
            </tr>
            <tr>
              <td>Inestocrasy</td>
              <td>200 K</td>
              <td className={styles.percentage}>
                <span>0.2%</span> <span className={styles.down}>▼</span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
