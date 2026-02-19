#!/bin/bash
sudo -u postgres psql -d seniorbraingames -c "UPDATE ip_salt SET salt = encode(gen_random_bytes(32), 'hex'), created_date = CURRENT_DATE WHERE id = 1;"
