SELECT * FROM shop_user;

UPDATE shop_user
SET USER_ROLE = 'ROLE_ADMIN'
WHERE user_id = 'bookking';


COMMIT;

CREATE TABLE test1 (
	num INT,
	NAME VARCHAR(30)
);

SELECT * FROM test1;

SELECT * FROM member;

SELECT * FROM environment_data;

UPDATE member 
SET authority = "ROLE_ADMIN"
WHERE user_id = "kim";



CREATE TABLE environment_data (
    id int AUTO_INCREMENT PRIMARY KEY,
    TEMP FLOAT,
    HUMIDITY FLOAT,
    TIME_LINE DATETIME DEFAULT SYSDATE()
);

CREATE TABLE category_info (
	cate_code INT PRIMARY KEY AUTO_INCREMENT,
	cate_name VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE item_info (
  item_code INT PRIMARY KEY AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock INT DEFAULT 0,
  seller VARCHAR(50) NOT NULL,
  description TEXT,
  image_path VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- ✅ 외래키 선언 (NOT NULL + 참조 + CASCADE)
  cate_code INT NOT NULL,
  FOREIGN KEY (cate_code) REFERENCES category_info(cate_code)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

SELECT * FROM category_info
ORDER BY cate_code ASC
;

SELECT * FROM item_info;