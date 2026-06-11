/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const winston = require('winston')
const getWinstonTransports = require('./winstonTransports')

function buildEntry (data, fields) {
  const [message = '', stmtFields = {}] = data
  return { message, ...fields, ...stmtFields }
}

class WinstonStructuredLogger {
  constructor (config) {
    this.fields = config.fields || {}
    this.logger = winston.createLogger({
      level: config.level,
      format: winston.format.combine(
        winston.format.label({ label: config.label }),
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: getWinstonTransports(config.transports),
      silent: config.silent
    })
  }

  close () { this.logger.close() }
  error (...data) { this.logger.error(buildEntry(data, this.fields)) }
  warn (...data) { this.logger.warn(buildEntry(data, this.fields)) }
  info (...data) { this.logger.info(buildEntry(data, this.fields)) }
  verbose (...data) { this.logger.verbose(buildEntry(data, this.fields)) }
  debug (...data) { this.logger.debug(buildEntry(data, this.fields)) }
  silly (...data) { this.logger.silly(buildEntry(data, this.fields)) }
}

module.exports = WinstonStructuredLogger
