#!/bin/bash
export $(cat .env | xargs) && python main.py