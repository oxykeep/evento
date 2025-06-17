-- eventhub_db

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    category_id INT NOT NULL,
    organizer_id INT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- CATEGORIES (default)
INSERT IGNORE INTO categories (name) VALUES
('Koncert'), ('Sport'), ('Edukacja'), ('Warsztaty'), ('Inne');

-- USERS (hasło: 123456 → $2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.)
INSERT INTO users (email, password, name, city) VALUES
('admin@event.com', '$2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.', 'Admin Główny', 'Warszawa'),
('anna@example.com', '$2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.', 'Anna Nowak', 'Kraków'),
('tomek@example.com', '$2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.', 'Tomasz Kowalski', 'Wrocław'),
('ola@example.com', '$2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.', 'Aleksandra Zielińska', 'Gdańsk'),
('michal@example.com', '$2y$10$D.gnFlfgN2bphfmWFM2qiO4ZNeiHUL9LnF/RKuM3ap.qJPOUb5t8.', 'Michał Maj', 'Poznań');

-- EVENTS
INSERT INTO events (title, description, location, event_date, event_time, category_id, organizer_id, image) VALUES
('Letni Festiwal', 'Muzyka na żywo przez 3 dni!', 'Warszawa, Plac Defilad', '2025-07-15', '18:00:00', 1, 1, 'concert.jpg'),
('Bieg Niepodległości', '10 km ulicami miasta', 'Kraków, Rynek', '2025-11-11', '09:00:00', 2, 2, NULL),
('Hackathon AI', 'Tworzenie innowacyjnych rozwiązań AI', 'Wrocław, Centrum Tech', '2025-09-01', '10:00:00', 3, 3, 'ai.jpg'),
('Warsztaty garncarskie', 'Zrób własną ceramikę', 'Gdańsk, Dom Sztuki', '2025-08-20', '14:00:00', 4, 4, NULL),
('Joga w parku', 'Relaksacyjna joga dla każdego', 'Poznań, Park Cytadela', '2025-07-01', '08:00:00', 2, 5, NULL),
('Kurs pierwszej pomocy', 'Zdobądź certyfikat!', 'Kraków, Szkoła Ratownictwa', '2025-06-20', '10:00:00', 3, 2, 'rescue.jpg'),
('Noc filmowa', 'Filmy pod gołym niebem', 'Warszawa, Pole Mokotowskie', '2025-07-22', '21:00:00', 5, 1, NULL),
('Gra terenowa', 'Zabawa i rywalizacja dla rodzin', 'Wrocław, Las Osobowicki', '2025-09-10', '12:00:00', 5, 3, NULL),
('Koncert rockowy', 'Najlepsze zespoły z Polski', 'Katowice, Spodek', '2025-10-05', '19:00:00', 1, 4, 'rock.jpg'),
('Zlot food trucków', 'Pyszne jedzenie z całego świata', 'Poznań, Stary Rynek', '2025-07-30', '13:00:00', 5, 5, 'food.jpg');
