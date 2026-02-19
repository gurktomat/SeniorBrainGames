#!/bin/bash
sudo -u postgres psql -d seniorbraingames -c "REFRESH MATERIALIZED VIEW CONCURRENTLY game_rating_aggregates;"
