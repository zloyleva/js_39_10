refresh: refresh_users refresh_products
             	@echo "refresh"

             refresh_users:
             	node migrations/users.js

             refresh_products:
             	@echo "refresh_products"

             start:
             	npm start