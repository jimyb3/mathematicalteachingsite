INSERT INTO #__update_sites (name, type, location, enabled, last_check_timestamp) VALUES ('Accredited Joomla! Translations', 'collection', 'http://update.joomla.org/language/translationlist.xml', 1, 0);
INSERT INTO #__update_sites_extensions (update_site_id, extension_id) VALUES (SCOPE_IDENTITY(), 600);
UPDATE  [#__assets] SET name=REPLACE( name, 'com_user.notes.category','com_users.category'  );
UPDATE  [#__assets] SET name=REPLACE( name, 'com_user.notes.category','com_users.category'  );
