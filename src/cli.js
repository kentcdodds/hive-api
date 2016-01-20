#!/usr/bin/env node
import {shorten} from './'
import program from 'commander'
import pkg from '../package.json'

program
  .version(pkg.version)
  .option('-u --url [url]', 'the url you wish to shorten')
  .option('-k --key [api key]', 'Your hive.am API key')
  .option('-c --custom [custom alias]', 'Your desired custom alias')
  .parse(process.argv)

const {url, key, custom} = program
shorten(url, {key, custom})

