# ![enter image description here](https://www.fablabs.io/media/W1siZiIsIjIwMTcvMTAvMjUvMTMvNDgvMjQvZTQzZDgxMGUtM2ZiMy00MjZjLTlhNzYtOGFlYzg1ZWY1OGNjL0xPR08gREVWSU5DSSBGQUJMQUIucG5nIl0sWyJwIiwidGh1bWIiLCIzMDB4MzAwIl1d/LOGO%20DEVINCI%20FABLAB.png?sha=9ae18eebf0e6ea56)MyFab - Frontend
Bonjour ! Vous vous trouvez actuellement sur le respository de MyFab. Le site est basé sur du Next.JS en tant que framework React et Tailwind CSS pour le framework CSS. Il est complété par Ghost pour la partie blog. 
### Installation:
 1. Cloner le repo
 2. Avoir npm et node d'installer sur votre ordinateur --> google
 3. Renommer le fichier "renameme.env.local" en ".env.local". Vous pourrez par la suite configurer l'adresse de l'API et les paramètres de GHOST.
 4. Exécutez dans le dossier du répertoire `npm install`
 5. Et voilà c'est prêt ! Il vous suffit d'exécuter ensuite `npm run dev` pour lancer le site.

 ### Installation de Ghost:
 Ghost permet de faire un back-end pour notre blog. A la place d'avoir un lourd éditeur de contenu, Ghost nous permet d'avoir l'avantage d'un CMS, en gardant juste son API (donc pas de front pour les utilisateurs "normaux").
 L'installation se fait très simplement: https://ghost.org/docs/install/local/

 Dès que Ghost est installé, il faut activer les `intégrations`:
  1. Rendez-vous sur http://localhost:2368/ghost/
  2. Aller dans vos paramètres
  3. Cliquer sur `integrations`
  4. Ajouter une nouvelle intégration. La `Content API Key` et `API Url` peuvent être renseignés dans le fichier `.env.local`
  5. Ajouter un nouveau webhook en mettant l'adresse suivante, avec comme événement `post created`: `http://localhost:5000/api/article/key`.
  6. Dans l'adresse ci-dessous remplacez le mot `key` par un hash que vous pouvez générer vous même, puis indiquer cet hash dans le fichier de configuration du backend.
  7. Et boum ! Un magnifique panel pour la création d'articles !
 
