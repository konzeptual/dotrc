;; Programs

;; Run or raise Firefox.
(defcommand firefox () ()
  "Start/Switchto Firefox."
  (run-or-raise "firefox" '(:class "Firefox") nil))
(define-key *root-map* (kbd "f")       "firefox")

(defcommand new-firefox () ()
  "Start new instance of Firefox."
  (run-commands "exec firefox"))
(define-key *root-map* (kbd "C-f")       "new-firefox")

(defcommand my-term () ()
  "Start/Switchto Term."
  (run-or-raise "gnome-terminal --hide-menubar" '(:class "terminal") nil))
(define-key *root-map* (kbd "c")       "my-term")

(defcommand my-new-term () ()
  "Start new Term."
  (run-commands "exec gnome-terminal --hide-menubarlo"))
(define-key *root-map* (kbd "C-c")     "my-new-term")

;; start EmacsDaemon.
(defcommand emacs-daemon () ()
  "Start EmacsDaemon."
  (run-shell-command "emacs --daemon" '(:class "EmacsDaemon")))

;; Run or rise Emacsclient.
(defcommand emacsclient () ()
  "Start/Switchto Emacsclient."
  (run-or-raise "emacsclient -c" '(:class "Emacs") nil))
(define-key *root-map* (kbd "e")       "emacsclient")

;; Launch new frame of Emacsclient.
(defcommand newEmacsclient () ()
  "Start new Emacsclient."
  (run-commands "exec emacsclient -c" ) )
(define-key *root-map* (kbd "C-e")     "newEmacsclient")

;; Run or rise Synaptic.
(defcommand synaptic () ()
  "Start/Switchto Synaptic."
  (run-or-raise "gksu synaptic" '(:class "synaptic")))
(define-key *root-map* (kbd "j")     "synaptic")

;; Run or rise Totem. 
(defcommand totem () ()
  "Start/Switchto Totem."
  (run-or-raise "totem" '(:class "totem")))
(define-key *root-map* (kbd "v")     "totem")
(define-key *root-map* (kbd "C-v")     "version")

;; Run or rise Kmymoney. 
(defcommand kmymoney () ()
  "Start/Switchto Kmymoney."
  (run-or-raise "kmymoney" '(:class "kmymoney")))
(define-key *root-map* (kbd "b")     "kmymoney")

(defcommand stardict () ()
  "Start/Switchto Stardict."
  (run-or-raise "stardict" '(:class "stardict") nil))

(defcommand transmission () ()
  "Start/Switchto Transmission."
  (run-or-raise "transmission" '(:class "transmission") nil))
(define-key *root-map* (kbd "i")     "transmission")
