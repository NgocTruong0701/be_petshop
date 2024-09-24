'use strict'

import mongoose from "mongoose";
import os from 'os';
import process from "process";

const _SECONDS = 5000;
const MAX_CONNECTIONS_THRESHOLD = 3;

// count Connect
export const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections::${numConnection}`);
}

// check over load
export const checkOverLoad = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        // Số kết nối tối đa dựa trên số lõi CPU
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnections}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnections > maxConnections - MAX_CONNECTIONS_THRESHOLD) {
            console.warn(`Connection overload detected!`);
            console.warn(`Active connections: ${numConnections}`);
            console.warn(`Maximum connections: ${maxConnections}`);
            console.warn(`Approaching maximum connections, consider scaling or optimizing your application.`);
        }
    }, _SECONDS);
}
